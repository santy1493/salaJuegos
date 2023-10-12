import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ChatComponent } from './components/chat/chat.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { JuegosComponent } from './components/juegos/juegos.component';

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

