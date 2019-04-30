import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SaboresProvider } from '../../../providers/sabores';
import { TamanhosProvider } from '../../../providers/tamanhos';

@IonicPage()
@Component({
  selector: 'page-cadastro-sabor',
  templateUrl: 'cadastro-sabor.html',
})
export class SaborCadastroPage {

  idSabor:number | null = null
  sabor:string = ''
  mostrarTamanhos:boolean = false
  tamanhos:any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private saboresProvider : SaboresProvider, private tamanhosProvider: TamanhosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaborCadastroPage');
  }

  esconderCampos() {
    this.mostrarTamanhos = false
    this.tamanhos = []
  }

  CarregarDados() {
    this.saboresProvider.getSaboresByName(this.sabor).subscribe(
      (data : any) => {
        this.tamanhos = []

        data.map((dado:any) => {
          dado.isChecked = (typeof dado.preco == "number")
          this.tamanhos.push(dado)
          this.idSabor = dado.idSabor
        })
      },
      (error : any) => {
        if (JSON.parse(error._body).ApiError = "1001") {
          this.tamanhosProvider.tamanhos().subscribe(
            (data : any) => {
              this.tamanhos = []
              this.idSabor = null
      
              data.map((dado:any) => {
                this.tamanhos.push({
                  "preco":null,
                  "idTamanho":dado.idTamanho,
                  "descricaoTamanho":dado.descricao})
              })
            }
          )
        }
      }
    )

    this.mostrarTamanhos = true
  }

  async salvar(){

    if (this.idSabor === null) {
      await this.saboresProvider.createSabor(this.sabor).subscribe(
        (data:any) => {
          console.log(data)
        })
    }

    this.tamanhos.map((tamanho:any) => {
      return
      }
    )
  }

}
