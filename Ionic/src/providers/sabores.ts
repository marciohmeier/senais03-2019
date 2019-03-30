import { Injectable } from '@angular/core';
import { HttpProvider } from './http';


/*
  Generated class for the LoginProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaboresProvider {

  constructor( public httpProvider : HttpProvider) {
  }
  public sabores(idTamanho : string){

    this.httpProvider.url = 'http://104.196.102.231/sabores/'+idTamanho;
    return this.httpProvider.get();
  }
}
