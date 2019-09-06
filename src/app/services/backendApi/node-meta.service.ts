import {Injectable} from '@angular/core';
import {API_PREFIX, IListResponse, INode, isListResponse, IVehicle, IProject} from '@stibs/api';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {handleError} from '../../utils/utils';
import {DEFAULT_PAGE_SIZE} from '../shared.service';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NodeMetaService extends BaseService {


  getNodeMetaList(userFilter?: any, userSort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE): Observable<IListResponse<INode>> {

    // const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    const params = this.getParams(userFilter, userSort, offset, limit);

    return this.http.get<IListResponse<INode>>(`/${API_PREFIX}/node`, {params}).pipe(
      catchError(handleError),
      map((response) => {
        if (!isListResponse(response)) {
          throw new Error('Error');
        }
        return response;

      })
    );
  }

  assignNodeProject(nodeName: string, projects: any) {
    const projectList = [];
    projects.forEach(item => {
      projectList.push(item['id']);
    });
    console.log(projectList);
    return this.http.post(`/${API_PREFIX}/node/${nodeName}/projects`, projectList, {responseType: 'text'}).pipe(
      catchError(handleError));
  }

  getNodeProjectAssignment(nodeName: string): Observable<Array<Partial<IProject> & { active: boolean }>> {
    return this.http.get<any>(`/${API_PREFIX}/node/${nodeName}/projects`).pipe(
      catchError(handleError),
      map(response => {
        if (!(response)) {
          throw new Error('Error');
        }
        return response;
      })
    );
  }

}
