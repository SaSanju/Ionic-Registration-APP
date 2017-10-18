import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from "../login/login";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  username = '';
  email = '';
  hide:Boolean;

  constructor(private nav: NavController, private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    if(info) {
      this.username = info.fname + ' ' + info.lname;
      this.email = info.email;
      this.hide = info.isVerified;
    }
  }
 
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage);
    });
  }

}
