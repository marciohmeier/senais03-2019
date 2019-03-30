import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the HttpProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  public url : string;
  public token : string;

  private TIMEOUT : number = 15000;

  constructor(private http: Http) {
    this.url = null;
    this.token = null;
  }
  private prepareHeaders(contentType : boolean){
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    if (contentType){
      headers.append('Content-Type', 'application/json');
    }

    if (this.token == ''){
      this.token = null;
    }

    if (this.token != null){
      headers.append('Authorization', 'bearer ' + this.token);
    }

    return headers;
  }

  public get() {
    let headers = this.prepareHeaders(false);
    return this.http.get(this.url, {headers: headers}).timeout(this.TIMEOUT).map((res : Response) => res.json());

  }
  public post(obj : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if ( obj != null && obj != undefined){
      body = JSON.stringify(obj);
    }
    return this.http.post(this.url, body,{headers: headers}).timeout(this.TIMEOUT).map((res : Response) => res.json);
  }
  public put(obj : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if (obj != null && obj != undefined){
      body = JSON.stringify(obj);
    }

    return this.http.put(this.url, body, {headers: headers}).timeout(this.TIMEOUT);;

  }
  public patch (obj : any){
    let body : string = '';

    let headers = this.prepareHeaders(true);

    if (obj != null && obj != undefined){
      body = JSON.stringify(obj);
    }

    return this.http.patch(this.url, body, {headers: headers}).timeout(this.TIMEOUT);;

  }
}