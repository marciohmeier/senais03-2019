import { TamanhosPage } from './../tamanhos/tamanhos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toasted } from '../../providers/toast';
import { LoginProvider } from '../../providers/login';
import { CadastroPage } from '../cadastro/cadastro';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:string;
  senha:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast : Toasted, private logon : LoginProvider) {
  }

  ionViewDidLoad() {
  }

  login(){
    this.logon.singIn(this.user, this.senha).subscribe(
      (data : any) => {
        this.navCtrl.setRoot(TamanhosPage);
      },
      (error : any) => {
        this.toast.presentToast("Login ou senha incorretos!");
        console.log(error);
      }
    )
  };

  cadastro(){
    this.navCtrl.setRoot(CadastroPage);
  }

}
