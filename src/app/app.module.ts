import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './materials.module';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { BungieService } from './services/bungie.service';
import { DestinyCacheService } from './services/destiny-cache.service';
import { AuthComponent } from './auth/auth.component';
import { LoggingInterceptorService } from './services/logging-interceptor.service';

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoggingInterceptorService,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    HomeComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    DestinyCacheService,
    BungieService,
    LOGGING_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
