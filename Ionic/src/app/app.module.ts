import { SaboresProvider } from './../providers/sabores';
import { TamanhosProvider } from './../providers/tamanhos';

import { HttpProvider } from './../providers/http';
import { LoginProvider } from './../providers/login';
import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from './../pages/login/login';
import { TamanhosPage } from './../pages/tamanhos/tamanhos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Messages} from '../providers/messages';
import {Toasted} from '../providers/toast';
import { LocalizacaoProvider } from '../providers/localizacao';
import { DadosEntregaPage } from '../pages/dados-entrega/dados-entrega';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TamanhosPage,
    DadosEntregaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    TamanhosPage,
    DadosEntregaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Messages,
    Toasted,
    LoginProvider,
    HttpProvider,
    TamanhosProvider,
    SaboresProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalizacaoProvider
  ]
})
export class AppModule {}
