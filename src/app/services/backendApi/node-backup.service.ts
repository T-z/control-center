import {Injectable} from '@angular/core';
import {API_PREFIX, IListResponse, INodeBackup, isListResponse} from '@stibs/api';
import {catchError, map, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {handleError} from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class NodeBackupService {

  constructor(private http: HttpClient) {
  }

  getNodeBackupList(offset: number = 0, limit: number = 10): Observable<IListResponse<INodeBackup>> {
    const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    return this.http.get<IListResponse<INodeBackup>>(`/${API_PREFIX}/node/backup`, {params}).pipe(
      retry(3),
      catchError(handleError),
      map((response) => {
        if (!isListResponse(response)) {
          throw new Error('Error');
        }
        return response;
      })
    );
  }

  deleteNodebackup(param: string | number) {
    return this.http.delete(`/${API_PREFIX}/node/backup/${param}`, {responseType: 'text'}).pipe(retry(3), catchError(handleError));
  }

}
