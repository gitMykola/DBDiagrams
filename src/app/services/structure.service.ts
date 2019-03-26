import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Structures } from '../services/sample.structure';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators'

class Structure { _id: number}

const API_URL = environment.apiUrl;
@Injectable()
export class StructureService {
  public structures: any[] = [];
  constructor(private http: HttpClient) {
    Structures.forEach(s => this.structures.push(s)); 
  }

  public getAllStructures(projectId: number): Observable<Structure[]> {
    const url = API_URL + `/structure/${projectId}`;
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

  public createStructure(structure: Structure): Observable<Structure> {
    const url = API_URL + '/structure';
    return this.http
      .post(url, { structure })
      .pipe(
        map((response: any) => {
          const data = response;
          return data.structures;
        }),
        catchError(this.handleError)
      );
  }

  public updateStructure(structure: Structure): Observable<Structure> {
    const url = API_URL + '/structure/';
    return this.http
      .put(url + structure._id, { structure })
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
