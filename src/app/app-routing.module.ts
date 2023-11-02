import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ChatComponent } from './components/chat/chat.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { PongComponent } from './pong/pong.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectLoggedInToHome },
    component: LoginComponent
  },
  { 
    path: 'home',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: HomeComponent
  },
  {
    path: 'registro',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectLoggedInToHome },
    component: RegistroComponent
  },
  {
    path: 'chat',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: ChatComponent
  },
  {
    path: 'juegos',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: JuegosComponent
  },
  {
    path: 'mayor-menor',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: MayorMenorComponent
  },
  {
    path: 'ahorcado',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: AhorcadoComponent
  },
  {
    path: 'preguntados',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: PreguntadosComponent
  },
  {
    path: 'pong',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: PongComponent
  },
  {
    path: 'encuesta',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: EncuestaComponent
  },
  { 
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

