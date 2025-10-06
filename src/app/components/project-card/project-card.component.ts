import { Component, Input } from '@angular/core';
import { Project } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
