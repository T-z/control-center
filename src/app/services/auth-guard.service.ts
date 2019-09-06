import {Injectable} from '@angular/core';
import {CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserAuthService} from './user_authentification/user-auth.service';
import {map, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router) {
  }

  checkAuthentication(path: string): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userAuthService.isLoggedIn()) {
      return true;
    }

    return this.userAuthService.validate().pipe(
      map(() => true),
      catchError(() => {

        this.router.navigate(['login']);
        return of(false);

      })
    );

  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRouter: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(activatedRouter.routeConfig.path);
  }
}





