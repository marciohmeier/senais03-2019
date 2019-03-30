import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaboresPage } from './sabores';

@NgModule({
  declarations: [
    SaboresPage,
  ],
  imports: [
    IonicPageModule.forChild(SaboresPage),
  ],
})
export class SaboresPageModule {}
