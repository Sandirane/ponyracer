import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
