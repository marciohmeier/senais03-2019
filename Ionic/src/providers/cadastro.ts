import { Injectable } from '@angular/core';
import { HttpProvider } from './http';

@Injectable()
export class CadastroProvider {

  constructor( public httpProvider : HttpProvider) {
    console.log('Hello CadastroProvider Provider');
  }

  public create(userName: string, password: string){
    let obj =  {
      userName : userName,
      password : password,
    };
    this.httpProvider.url = 'http://localhost:3000/create';
    return this.httpProvider.post(obj);

  }
}
