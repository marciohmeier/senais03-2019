import { SaboresProvider } from './../../../providers/sabores';
import { TamanhosProvider } from './../../../providers/tamanhos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosEntregaPage } from '../dados-entrega/dados-entrega';

@IonicPage()
@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
})
export class PizzaPage {

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
    this.sabores.saboresByTamanhoId(item.idTamanho).subscribe(
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
