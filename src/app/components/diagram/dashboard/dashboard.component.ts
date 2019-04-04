import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../../models';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  projects: Project[];
  constructor(
    private projectsService: ProjectsService,
    private editorService: EditorService
  ) { }
  //TODO put all in one ActionService
  ngOnInit() {
  }
  loadSample() {
    this.projectsService.getSample().subscribe((data: Project[]) => {
      console.log(data[0]);
      this.projects = data;
      if (data.length) this
        .editorService.loadProject(data[0]);
    })
  }
  ngOnDestroy() {
    this.projectsService.getSample();
  }
}
