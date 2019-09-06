import {IAuthority, IUser} from '@stibs/api';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export function customLowerCase(data: string) {
  return data.toLowerCase();
}

export function customNumberValidator(param: any) {
  const vld_bool = typeof(param) === 'number' ? true : false;
  return vld_bool;
}

export function customDateValidator(param: any) {
  if (param !== undefined) {
    const vld_bool = (param.getDate() && param.getMonth() && param.getFullYear()) ? true : false;
    return vld_bool;
  }
}

export function dayBetween(d1: string | Date, d2: string | Date) {

  const getTime = (d: string | Date): number => {

    if (typeof d === 'string') {
      d = new Date(d);
    }
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

  };

  return Math.floor((getTime(d2) - getTime(d1)) / (1000 * 60 * 60 * 24));

}

export function getRoleDescription(_content: any[], value: string) {
  const index = _content.findIndex((item: IAuthority) => {
    return item.name === value;
  });
  return _content[index].description;
}

export function handleError(err: HttpErrorResponse) {
  let customErrMsg = '';
  if (err.error instanceof ErrorEvent) {
    customErrMsg = ' Client Side || Network Error' + err.error.message;
    console.log(' Client Side || Network Error' + err.error.message);
  } else {
    customErrMsg = 'Status Code : ' + err.status + ',' + err.error.toString() + '; Message: ' + err.message;
    console.error('Status: ' + err.status + ' Message: ' + err.message + '  Error: ' + err.error.toString());
  }
  return throwError(`${customErrMsg}`);
}

export const formatUsername = (user: IUser): string => {

  if (user) {
    return user.forename ? `${user.forename.slice(0, 1)}. ${user.surname}` : user.username;
  }

};

export const shortcutAuthority = (authorityName: string): string => {
  if (authorityName.match(/AUTHORITY_/i)) {
    const shortcut = authorityName.replace(/AUTHORITY_/i, '') === 'ADMINISTRATOR' ? 'ADMIN' : authorityName.replace(/AUTHORITY_/i, '');
    return shortcut;

  }

};
