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
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['usuario/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'quien-soy',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: QuienSoyComponent
  },
  {
    path: 'chat',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: ChatComponent
  },
  {
    path: 'usuario',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectLoggedInToHome },
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'juegos',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('./modules/juegos/juegos.module').then((m) => m.JuegosModule),
  },
  {
    path: 'encuestas',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('./modules/encuesta/encuesta.module').then((m) => m.EncuestaModule),
  },
  {
    path: 'puntajes',
    canActivate: [ AuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: PuntajesComponent
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

