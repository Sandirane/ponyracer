import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userService.getCurrentUser();
    if (user) {
      const clone = request.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });
      return next.handle(clone);
    }
    return next.handle(request);
  }
}
