import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  currentUser;

  public login(credentials) {
    console.log(credentials)
    if (credentials.email == null || credentials.password == null) {
      return Observable.create(observer => {
        observer.next(false);
        observer.complete();
      });
    } else {
      return Observable.create(observer => {
        // At this point store the credentials to your backend!
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:8000/api/login', JSON.stringify(credentials), { headers: headers })
          .subscribe(res => {
            console.log(res.json());
            var data = res.json();
            if(data) {
              this.currentUser = data.user;
              observer.next(data);
              observer.complete();
            }
          });
      });  
    }
  }

  public register(credentials) {
    if (credentials.fname == null || credentials.lname == null || credentials.email == null || credentials.pw == null) {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8000/api/signup', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          var data = res.json();
          observer.next(data);
          observer.complete();
        });
      });
    }
  }


  public reset(credentials) {
    if (credentials.email == null || credentials.oldPass == null || credentials.newPass == null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('http://localhost:8000/api/reset', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          console.log(res.json());
        });
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
