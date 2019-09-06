import { Injectable } from '@angular/core';
import { API_PREFIX, IListResponse, isListResponse, IUser, UserPasswordRequest } from '@stibs/api';
import { HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  getUserList(userFilter?: any, userSort?: any, offset: number = 0, limit: number = 10): Observable<IListResponse<IUser>> {

    const params = this.getParams(userFilter, userSort, offset, limit);

    return this.http.get<IListResponse<IUser>>(`/${API_PREFIX}/user`, { params }).pipe(
      filter((response) => isListResponse(response))
    );

  }

  addUser(param: FormData) {
    return this.http.post<IUser>(`/${API_PREFIX}/user`, param);
  }

  editUser(param: FormData) {
    return this.http.put<IUser>(`/${API_PREFIX}/user/${param.get('id')}`, param);
  }

  deleteUser(param: string | number) {
    return this.http.delete(`/${API_PREFIX}/user/${param}`, { responseType: 'text' });
  }

  setPwd(params: UserPasswordRequest) {
    return this.http.put(`/${API_PREFIX}/user/password/set`, params, { responseType: 'text' });
  }

  resetPwd(identifier: string) {

    const params = new HttpParams().set('identifier', identifier);

    return this.http.post(`/${API_PREFIX}/user/password/reset`, null, { params });

  }

}
