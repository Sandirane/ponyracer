import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';
import { UserModel } from './models/user.model';
import { UserService } from './user.service';

describe('jwtInterceptor', () => {
  let userService: jasmine.SpyObj<UserService>;
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    userService = jasmine.createSpyObj<UserService>('UserService', ['getCurrentUser']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
      ]
    });
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should do nothing if no jwt token', () => {
    userService.getCurrentUser.and.returnValue(null);

    httpClient.get('/api/foo').subscribe();

    const testRequest = http.expectOne('/api/foo');
    expect(testRequest.request.headers.get('Authorization')).toBe(null);
  });

  it('should send a jwt token', () => {
    userService.getCurrentUser.and.returnValue({ token: 'hello' } as UserModel);

    httpClient.get('/api/foo').subscribe();

    const testRequest = http.expectOne('/api/foo');
    expect(testRequest.request.headers.get('Authorization')).toBe('Bearer hello');
  });
});
