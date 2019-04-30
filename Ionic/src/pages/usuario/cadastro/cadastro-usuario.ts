import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toasted } from '../../../providers/toast';
import { CadastroProvider } from '../../../providers/cadastro';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  user:string;
  senha:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast : Toasted, private cadastro : CadastroProvider) {
  }

  ionViewDidLoad() {
  }

  cadastrar(){
    this.cadastro.create(this.user, this.senha).subscribe(
      (data : any) => {
        this.navCtrl.setRoot(LoginPage);
      },
      (error : any) => {
        this.toast.presentToast(JSON.parse(error._body).ErrorDescription);
        console.log(error);
      }
    )
  };

  logar() {
    this.navCtrl.setRoot(LoginPage);
  }
}
