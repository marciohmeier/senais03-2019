import { HttpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

/* PROVIDERS */
import { Messages } from '../providers/messages';
import { Toasted } from '../providers/toast';
import { SaboresProvider } from './../providers/sabores';
import { TamanhosProvider } from './../providers/tamanhos';
import { HttpProvider } from './../providers/http';
import { LoginProvider } from './../providers/login';
import { CadastroProvider } from '../providers/cadastro';
import { LocalizacaoProvider } from '../providers/localizacao';

/* PAGES */
import { DadosEntregaPage } from '../pages/pedido/dados-entrega/dados-entrega';
import { CadastroUsuarioPage } from '../pages/usuario/cadastro/cadastro-usuario';
import { LoginPage } from './../pages/usuario/login/login';
import { PizzaPage } from './../pages/pedido/pizza/pizza';
import { SaborCadastroPage } from './../pages/sabor/cadastro/cadastro-sabor'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PizzaPage,
    DadosEntregaPage,
    CadastroUsuarioPage,
    SaborCadastroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PizzaPage,
    DadosEntregaPage,
    CadastroUsuarioPage,
    SaborCadastroPage
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
    LocalizacaoProvider,
    CadastroProvider
  ]
})
export class AppModule {}
