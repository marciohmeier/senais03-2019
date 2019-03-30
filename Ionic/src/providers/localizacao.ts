import { Injectable } from '@angular/core';
import { HttpProvider } from './http';

/*
  Generated class for the LocalizacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalizacaoProvider {

  constructor(public httpProvider : HttpProvider) {
    console.log('Hello LocalizacaoProvider Provider');
  }

  public cidades(){

    this.httpProvider.url = 'http://104.196.102.231/cidades';
    return this.httpProvider.get();
  }

  public bairros(idCidade : number){

    this.httpProvider.url = 'http://104.196.102.231/bairros/'+idCidade;
    return this.httpProvider.get();
  }
}
