import { Injectable } from '@angular/core';
import { Project, Collection, Reference } from '../models';

@Injectable()
export class EditorService {
  public text: string = '';
  public loadProject(project: Project) {
    this.text = '';
    project.collections.forEach((collection: Collection) => {
      this.text += collection.toString();
    });
    project.references.forEach((reference: Reference) => {
      this.text += reference.toString();
    });
  }
}
