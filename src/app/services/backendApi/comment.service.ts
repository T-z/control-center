import { Injectable } from '@angular/core';
import { API_PREFIX, IComment, IListResponse, isListResponse } from '@stibs/api';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  getCommentList(userFilter?: any, userSort?: any, offset: number = 0, limit: number = 5): Observable<IListResponse<IComment>> {

    const params = this.getParams(userFilter, userSort, offset, limit);

    return this.http.get<IListResponse<IComment>>(`/${API_PREFIX}/comment`, { params }).pipe(
      map((response) => {
        if (!isListResponse(response)) {
          throw new Error('Error');
        }
        return response;
      })
    );

  }

}
