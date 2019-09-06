import {HttpParams, HttpClient} from '@angular/common/http';

export class BaseService {

  constructor(protected http: HttpClient) {
  }

  protected getParams(userFilter?: any, userSort?: any, offset: number = 0, limit: number = 10) {

    let params = new HttpParams().set('offset', String(offset)).set('limit', String(limit));

    if (userFilter) {
      for (const [key, value] of Object.entries(userFilter)) {
        params = params.append(`filter.${key}`, String(value));
      }
    }

    if (userSort) {
      for (const [key, value] of Object.entries(userSort)) {
        params = params.append(`sort.${key}`, String(value));
      }
    }

    return params;
  }

}
