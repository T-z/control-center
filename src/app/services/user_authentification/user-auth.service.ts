import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser, AUTHORITY, ValidateResponse, API_PREFIX, AuthenticateResponse} from '@stibs/api';
import {map, catchError, switchMap} from 'rxjs/operators';
import {IdleService} from 'src/app/services/idle.service';
import {Observable, EMPTY, BehaviorSubject} from 'rxjs';
import {formatUsername} from 'src/app/utils/utils';
import {SharedService} from '../shared.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined);

  constructor(private sharedService: SharedService, private http: HttpClient, private idleSerice: IdleService, private router: Router) {

    this.idleSerice.onIdleTimeout.subscribe(() => {
      this.invalidate();
    });

  }

  get currentUser(): IUser {
    return this._currentUser.value;
  }

  set currentUser(user: IUser) {
    this._currentUser.next(user);
  }

  public onUser(): Observable<IUser> {
    return this._currentUser;
  }

  public authenticate(credentials: { username: string, password: string }): Observable<any> {
    return this.authenticateSession(credentials).pipe(
      map((response) => {

        this.sharedService.currentMeta = response.meta;
        this.currentUser = response.user;
      }),
      switchMap(async () => {
        return this.router.navigate(['dashboard']).then(() => {
          this.idleSerice.run();
        });
      })
    );
  }

  public validate(): Observable<void> {
    return this.validateSession().pipe(
      map((response) => {

        this.sharedService.currentMeta = response.meta;
        this.currentUser = response.user;

        this.idleSerice.run();

      }));
  }

  public invalidate() {

    this.currentUser = undefined;
    this.invalidateSession().subscribe(() => {
      this.router.navigate(['login']);
    });

  }

  public isLoggedIn() {
    return !!this.currentUser;
  }

  public username(): string {
    return formatUsername(this.currentUser);
  }

  public isTeam(): boolean {
    return this.currentUser && this.currentUser.authority && this.currentUser.authority.name === AUTHORITY.TEAM;
  }

  public isAdministrator(): boolean {
    return this.currentUser && this.currentUser.authority && this.currentUser.authority.name === AUTHORITY.ADMINISTRATOR;
  }

  public hasAuthority(authority: AUTHORITY): boolean {

    if (this.currentUser) {

      if (this.currentUser.authority && this.currentUser.authority.name === AUTHORITY.ADMINISTRATOR) {
        return true;
      }

      if (this.currentUser.authority && this.currentUser.authority.name === authority) {
        return true;
      }

    }

    return false;

  }

  private authenticateSession(credentials: { username: string, password: string }): Observable<AuthenticateResponse> {
    return this.http.post<AuthenticateResponse>(`/${API_PREFIX}/authenticate`, credentials);
  }

  private validateSession(): Observable<ValidateResponse> {
    return this.http.get(`/${API_PREFIX}/validate`, {observe: 'response', responseType: 'text'}).pipe(
      map((response) => {

        const type = response.headers.get('content-type');

        if (type.startsWith('application/json')) {
          return JSON.parse(response.body);
        }

        throw new Error('Validation failed');

      }));
  }

  private invalidateSession(): Observable<void> {
    console.log('Invalidate');
    return this.http.get(`/${API_PREFIX}/invalidate`, {responseType: 'text'}).pipe(
      map((resp) => {
        console.log(resp);
        // undefine
      }),
      catchError(() => EMPTY));
  }

}
