import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { ResetPage } from "../reset/reset";
import { RegisterPage } from "../register/register";
import { DashboardPage } from "../dashboard/dashboard";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
  
  createAccount() {
    this.nav.setRoot(RegisterPage, {}, { animate: true, direction: 'forward' });
  }

  reset() {
    this.nav.setRoot(ResetPage, {}, { animate: true, direction: 'forward' });
  }
 
  login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed && allowed.success) {        
        this.nav.setRoot(DashboardPage, {}, { animate: true, direction: 'forward' });
      } else {
        this.showError("Access Denied");
      }
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
