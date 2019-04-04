import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import testData from '../../assets/sample.project.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators'
import { Project } from '../models';


const API_URL = environment.apiUrl;
const TEST_DATA_URL = environment.TEST_DATA_URL;

@Injectable()
export class ProjectsService {
  constructor(private http: HttpClient) {
    //console.dir(testData);
  }

  public getAll(user: string): Observable<Project[]> {
    const url = API_URL + `/project/${user}`;
    return this.http
      .get(url)
      .pipe(
        map((response: any) => {
          const data = response;
          return data.structures;
        }),
        catchError(this.handleError)
      );
  }

  public getSample(): Observable<Project[]> {
    return this.http
      .get(TEST_DATA_URL)
      .pipe(
      map((response: Project[]) => {
        const data = [];
        response.forEach(res => data.push(new Project(res)));
        //console.dir(response.map(res => new Project(res)));
        return data;
        }),
        catchError(this.handleError)
      );
  }

  public updateStructure(project: Project): Observable<Project> {
    const url = API_URL + '/structure/';
    return this.http
      .put(url + project.id, { project })
      .pipe(
        map((response: any) => {
          const data = response;
          return data.structures;
        }),
        catchError(this.handleError)
      );
  }

  public deleteStructureById(structureId: number) {
    const url = API_URL + `/structure/${structureId}`;
    return this.http
      .delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    console.error('ProjectService::handleError', error);
    return Observable.throw(error);
  }
}
