import {Injectable} from '@angular/core';
import {API_PREFIX, IDefect, IListResponse, isListResponse} from '@stibs/api';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefectService extends BaseService {


  getDefectList(defectFilter?: any, defectSort?: any, offset: number = 0, limit: number = 5): Observable<IListResponse<IDefect>> {
    
    const params = this.getParams(defectFilter, defectSort, offset, limit);
    
    return this.http.get<IListResponse<IDefect>>(`/${API_PREFIX}/defect`, {params}).pipe(
      map((response) => {
        
        if (!isListResponse(response)) {
          throw new Error('Error');
        }

        return response;

      })
    );

  }

}
