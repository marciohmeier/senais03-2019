import { Injectable } from '@angular/core';
import { HttpProvider } from './http';


/*
  Generated class for the LoginProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor( public httpProvider : HttpProvider) {
    console.log('Hello LoginProvider Provider');
  }

/*

{
	"userName":"admin@senai",
	"password":"1234"
}

*/

  public singIn(userName: string, password: string){
    let obj =  {
      userName : userName,
      password : password,
    };
    this.httpProvider.url = 'http://104.196.102.231/logon';
    return this.httpProvider.post(obj);

  }
}
