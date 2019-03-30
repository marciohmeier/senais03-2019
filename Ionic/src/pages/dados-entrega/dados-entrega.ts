import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalizacaoProvider } from '../../providers/localizacao';

/**
 * Generated class for the DadosEntregaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dados-entrega',
  templateUrl: 'dados-entrega.html',
})
export class DadosEntregaPage {

  public listaCidades = [];
  public listaBairros = [];

  public cidadeId:number;
  public nomeBairro:string;

  public rua:string;
  public numero:string;
  public complemento:string;
  public referencia:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private localizacaoProvider: LocalizacaoProvider){
  }

  ionViewDidLoad() {
    this.carregarCidades();
  }

  carregarCidades(){
    this.localizacaoProvider.cidades().subscribe(
      (data : any) => {
        this.listaCidades = data;
      },
      (error : any) => {
        console.log(error);
      }
    )
  }

  carregarBairros() {
    this.localizacaoProvider.bairros(this.cidadeId).subscribe(
      (data : any) => {
        this.listaBairros = data;
      },
      (error : any) => {
        console.log(error);
      }
    )
  }

  resetarCampos(){

    this.listaBairros = [];

    this.cidadeId = null;
    this.nomeBairro = '';

    this.rua = '';
    this.numero = '';
    this.complemento = '';
    this.referencia = '';
  }

}
