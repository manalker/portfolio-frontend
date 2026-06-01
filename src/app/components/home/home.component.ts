import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TranslatePipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  menuOpen = false;
  isAnimating = false;
  currentRoleIndex = 0;
  private intervalId: any;

  roles = [
    {
      titleFr: 'Ingénieure en Informatique & Réseaux (MIAGE)',
      titleEn: 'Computer & Network Engineer (MIAGE)',
      shortFr: 'MIAGE', shortEn: 'MIAGE',
      stack: ['Java', 'Angular', 'Spring Boot', 'SQL', 'Agile'],
      descFr: 'Diplômée ingénieure en informatique et réseaux option MIAGE à l\'École Marocaine des Sciences de l\'Ingénieur de Rabat (EMSI). Expérimentée dans le développement de solutions digitales complètes — de la conception à la livraison — avec une forte maîtrise des méthodologies agiles, une capacité d\'adaptation rapide aux nouveaux environnements et une approche orientée performance et qualité logicielle.',
      descEn: 'Engineering graduate in Computer Science & Networks (MIAGE option) from EMSI Rabat. Experienced in delivering end-to-end digital solutions with agile methodologies, quick adaptability to new environments, and a strong focus on software quality and performance.'
    },
    {
      titleFr: 'Développeuse Full-Stack Java / Spring Boot / Angular',
      titleEn: 'Full-Stack Developer Java / Spring Boot / Angular',
      shortFr: 'Full-Stack Java', shortEn: 'Full-Stack Java',
      stack: ['Java', 'Spring Boot', 'Angular', 'JPA', 'Liquibase', 'Azure DevOps', 'PostgreSQL'],
      descFr: 'Développement et amélioration d\'applications web full-stack (Front-end & Back-end) chez Maneos Consulting. Conception d\'APIs REST robustes avec Spring Boot, JPA et Liquibase, refonte complète d\'interfaces Angular avec dashboards interactifs, formulaires dynamiques et filtres avancés. Suivi agile et gestion des sprints via Azure DevOps. Expérience concrète sur des projets de gestion de tickets et de pipeline commercial.',
      descEn: 'Full-stack web application development at Maneos Consulting. Building robust REST APIs with Spring Boot, JPA and Liquibase, complete Angular front-end redesign with interactive dashboards, dynamic forms and advanced filters. Agile sprint management via Azure DevOps. Hands-on experience on ticket management and commercial pipeline projects.'
    },
    {
      titleFr: 'Développeuse PHP / Laravel / Vue JS / Next JS',
      titleEn: 'PHP / Laravel / Vue JS / Next JS Developer',
      shortFr: 'PHP / Vue JS', shortEn: 'PHP / Vue JS',
      stack: ['PHP', 'Laravel', 'Vue JS', 'Next JS', 'TypeScript', 'Pinia', 'NuxtJS', 'WordPress'],
      descFr: 'Développement et maintenance de plateformes web multi-projets chez Maneos Consulting : site e-commerce de matériels médicaux, sites WordPress et solutions sur mesure. Maîtrise de TypeScript, Pinia et NuxtJS pour des architectures front-end modernes. Intégration de solutions tierces, correction de bugs, optimisation des performances et amélioration de l\'expérience utilisateur. Travail en environnement multi-client avec GitLab et WordPress.',
      descEn: 'Development and maintenance of multi-project web platforms at Maneos Consulting: medical equipment e-commerce, WordPress sites, and custom solutions. Proficiency in TypeScript, Pinia and NuxtJS for modern front-end architectures. Third-party integrations, bug fixing, performance optimization, and UX improvement in a multi-client environment with GitLab and WordPress.'
    },
    {
      titleFr: 'Développeuse Mobile Flutter / Dart',
      titleEn: 'Mobile Developer Flutter / Dart',
      shortFr: 'Flutter', shortEn: 'Flutter',
      stack: ['Flutter', 'Dart', 'Firebase', 'MongoDB', 'Node.js', 'REST API'],
      descFr: 'Création d\'applications mobiles cross-platform avec Flutter & Dart dans le cadre de projets académiques et personnels. Intégration de Firebase pour les notifications push en temps réel et la gestion des utilisateurs. Back-end développé avec Node.js et MongoDB pour des APIs performantes. Maîtrise du développement Android & iOS depuis un seul codebase, avec VSCode et IntelliJ comme environnements principaux.',
      descEn: 'Cross-platform mobile application development with Flutter & Dart in academic and personal projects. Firebase integration for real-time push notifications and user management. Node.js and MongoDB back-end for performant APIs. Mastery of single-codebase Android & iOS development, using VSCode and IntelliJ as main IDEs.'
    },
    {
      titleFr: 'Architecte Microservices & Cloud',
      titleEn: 'Microservices & Cloud Architect',
      shortFr: 'Microservices', shortEn: 'Microservices',
      stack: ['Spring Cloud', 'Eureka', 'Kafka', 'Docker', 'Spring Boot', 'API Gateway'],
      descFr: 'Conception et développement de systèmes distribués basés sur une architecture microservices avec Spring Cloud, Eureka pour la découverte de services et Spring Boot pour chaque module. Gestion des pipelines de données avec Apache Kafka pour la communication asynchrone entre services. Déploiement scalable et conteneurisation avec Docker. Projet académique de gestion de commandes en microservices comme projet phare.',
      descEn: 'Design and development of distributed microservices-based systems using Spring Cloud, Eureka for service discovery and Spring Boot for each module. Data pipeline management with Apache Kafka for asynchronous inter-service communication. Scalable deployment and containerization with Docker. Academic order management microservices project as a flagship delivery.'
    },
    {
      titleFr: 'QA Engineer & Test Automation',
      titleEn: 'QA Engineer & Test Automation',
      shortFr: 'QA / Tests', shortEn: 'QA / Tests',
      stack: ['JUnit 5', 'Mockito', 'PowerMock', 'TDD', 'BDD', 'ATTD', 'Spring Boot'],
      descFr: 'Pratique rigoureuse des tests logiciels : tests unitaires, d\'intégration et fonctionnels avec JUnit 5, Mockito et PowerMock dans des projets Spring Boot. Approches TDD (Test-Driven Development), BDD (Behavior-Driven Development) et ATTD pour garantir la qualité à chaque livraison. Réalisation de tests sur des modules critiques comme la gestion des tickets, l\'authentification et les APIs REST. Suivi qualité intégré dans les pipelines CI/CD via Azure DevOps et GitHub.',
      descEn: 'Rigorous software testing practice: unit, integration and functional tests with JUnit 5, Mockito and PowerMock on Spring Boot projects. TDD, BDD and ATTD approaches to ensure quality at every delivery. Testing on critical modules including ticket management, authentication and REST APIs. Quality tracking integrated into CI/CD pipelines via Azure DevOps and GitHub.'
    },
    {
      titleFr: 'Data Engineer & Big Data',
      titleEn: 'Data Engineer & Big Data',
      shortFr: 'Big Data', shortEn: 'Big Data',
      stack: ['Hadoop', 'Spark', 'Oracle', 'PostgreSQL', 'MongoDB', 'MySQL', 'SQL Server'],
      descFr: 'Maîtrise d\'Apache Hadoop et Apache Spark pour le traitement distribué de grands volumes de données. Administration et modélisation de bases de données relationnelles et NoSQL : Oracle, PostgreSQL, MySQL, SQL Server et MongoDB. Utilisation de UML pour la modélisation des données. Expérience en Big Data à travers des projets académiques et des formations certifiantes orientées ingénierie des données et traitement à grande échelle.',
      descEn: 'Proficiency in Apache Hadoop and Apache Spark for distributed large-scale data processing. Administration and modeling of relational and NoSQL databases: Oracle, PostgreSQL, MySQL, SQL Server and MongoDB. UML for data modeling. Big Data experience through academic projects and certifying training programs focused on data engineering and large-scale processing.'
    }
  ];

  get currentRole() {
    return this.roles[this.currentRoleIndex];
  }

  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.startRoleRotation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startRoleRotation(): void {
    this.intervalId = setInterval(() => {
      this.isAnimating = true;
      setTimeout(() => {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.isAnimating = false;
      }, 500);
    }, 4000);
  }

  goToRole(index: number): void {
    if (index === this.currentRoleIndex) return;
    this.isAnimating = true;
    setTimeout(() => {
      this.currentRoleIndex = index;
      this.isAnimating = false;
    }, 500);
  }

  setLang(l: string) {
    this.languageService.setLang(l);
  }

  closeMenu() { this.menuOpen = false; }

  downloadCV() {
    this.http.get('assets/docs/manal-kerroumi.pdf', { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'manal-kerroumi.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Erreur téléchargement CV:', error);
      });
  }
}
