import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials = { fname: '', lname: '', email: '', pw: '' };
  
 
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController) { }
 
  register() {
    this.auth.register(this.registerCredentials).subscribe(allowed => {
      if (allowed && allowed.success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
        this.nav.setRoot(LoginPage, {}, { animate: true, direction: 'forward' });
      } else {
        this.showPopup("Error", allowed.message);
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
