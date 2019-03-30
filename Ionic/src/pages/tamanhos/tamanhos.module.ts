import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TamanhosPage } from './tamanhos';

@NgModule({
  declarations: [
    TamanhosPage,
  ],
  imports: [
    IonicPageModule.forChild(TamanhosPage),
  ],
})
export class TamanhosPageModule {}
