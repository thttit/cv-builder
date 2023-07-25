import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // replace with the path to your AuthService

@Injectable({
  providedIn: 'root',
})
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor() { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//       let token = '6pqRvBZy-o43M_ik4pCvGQ';

//       let jwtToken = req.clone({
//           setHeaders: {
//               Authorization: 'Bearer ' + token
//           }
//       })
//       return next.handle(jwtToken);
//   }
// }
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {} // inject AuthService

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.accessToken; // get access token from AuthService

    if (token) {
      const jwtToken = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });

      return next.handle(jwtToken);
    }

    return next.handle(req);
  }
}
