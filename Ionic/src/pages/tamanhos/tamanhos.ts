import { SaboresProvider } from './../../providers/sabores';
import { TamanhosProvider } from './../../providers/tamanhos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosEntregaPage } from '../dados-entrega/dados-entrega';

/**
 * Generated class for the TamanhosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tamanhos',
  templateUrl: 'tamanhos.html',
})
export class TamanhosPage {

  public listaTamanhos = [];
  public listaSabores = [];

  public mostraBotao:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private tamanhos : TamanhosProvider, private sabores : SaboresProvider) {
  }

  ionViewDidLoad() {
    this.tamanhos.tamanhos().subscribe(
      (data : any) => {
        this.listaTamanhos = data;
      },
      (error : any) => {
        console.log(error);
      }
    )
  }

  obterSabores(item) {
    this.sabores.sabores(item.idTamanho).subscribe(
      (data : any) => {
        this.listaSabores = data;
        this.desabilitarBotao();
      },
      (error : any) => {
        console.log(error);
      }
    )
  }

  habilitarBotao(){
    this.mostraBotao = true;
  }

  desabilitarBotao() {
    this.mostraBotao = false;
  }

  dadosEntrega(){
    this.navCtrl.setRoot(DadosEntregaPage);
  }
}
