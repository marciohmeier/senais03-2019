import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaborCadastroPage } from './cadastro-sabor';

@NgModule({
  declarations: [
    SaborCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(SaborCadastroPage),
  ],
})
export class SaborCadastroPageModule {}
