import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Toasted{
  constructor(private toastCtrl : ToastController){
  }

  presentToast(mensagem : string ) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
