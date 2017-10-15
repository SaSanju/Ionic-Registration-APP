import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'; 


import { MyApp } from './app.component';
import { LoginPage } from "../pages/login/login";
import { ResetPage } from "../pages/reset/reset";
import { RegisterPage } from "../pages/register/register";
import { DashboardPage } from "../pages/dashboard/dashboard";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ReCaptchaModule } from 'angular2-recaptcha';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ResetPage,
    DashboardPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReCaptchaModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ResetPage,
    DashboardPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
