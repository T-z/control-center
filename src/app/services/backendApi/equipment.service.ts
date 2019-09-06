import {Injectable} from '@angular/core';
import {handleError} from '../../utils/utils';
import {Observable, Subject} from 'rxjs';
import {API_PREFIX, IEquipment, IListResponse, isListResponse} from '@stibs/api';
import {catchError, map, retry} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  _equipments: any[];

  constructor(private http: HttpClient) {
  }

  getEquipmentList(offset: number = 0, limit: number = 5): Observable<IListResponse<IEquipment>> {
    const params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));
    this._equipments = [];
    return this.http.get<IListResponse<IEquipment>>(`/${API_PREFIX}/equipment`, {params}).pipe(
      catchError(handleError),
      map((response) => {
        if (!isListResponse(response)) {
          throw new Error('Error');
        }
        return response;

      })
    );
  }

  addEquipment(param: IEquipment) {
    return this.http.post<IEquipment[]>(`/${API_PREFIX}/equipment`, param).pipe(catchError(handleError));
  }

  editEquipment(param: IEquipment) {
    return this.http.put<IEquipment>(`/${API_PREFIX}/equipment/${param['id']}`, param).pipe(catchError(handleError));
  }

  deleteEquipment(paramId: string | number) {
    return this.http.delete(`/${API_PREFIX}/equipment/${paramId}`, {responseType: 'text'}).pipe(catchError(handleError));
  }

  syncEquipments() {
    const param: IEquipment[] = this._equipments;
    // console.log(param);
    return this.http.post<IEquipment[]>(`/${API_PREFIX}/equipment/sync`, param).pipe(catchError(handleError));
  }

}
