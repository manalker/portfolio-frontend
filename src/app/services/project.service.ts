import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  showDescription: boolean;
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  titleEn?: string;
  descriptionEn?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private dataUrl = 'data/projects.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.dataUrl);
  }
}
