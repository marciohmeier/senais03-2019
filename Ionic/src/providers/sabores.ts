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
  public saboresByTamanhoId(idTamanho : string){

    this.httpProvider.url = 'http://localhost:3000/sabores-tamanho/'+idTamanho;
    return this.httpProvider.get();
  }
  public getSabores(idSabor : string | null){

    this.httpProvider.url = 'http://localhost:3000/sabores';
    if (typeof idSabor == "number") this.httpProvider.url=this.httpProvider.url + '/' + idSabor

    return this.httpProvider.get();
  }

  public getSaboresByName(name : string){

    this.httpProvider.url = 'http://localhost:3000/sabores?name=' + name;
    return this.httpProvider.get();
  }

  public createSabor(nome:string){
    
    let objeto = {sabor:nome}
    this.httpProvider.url = 'http://localhost:3000/sabores';
    return this.httpProvider.post(objeto);
  }
}
