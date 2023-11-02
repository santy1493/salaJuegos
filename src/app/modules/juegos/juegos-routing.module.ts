import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { JuegosComponent } from 'src/app/components/juegos/juegos.component';
import { MayorMenorComponent } from 'src/app/components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';
import { PongComponent } from 'src/app/pong/pong.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayor-menor', component: MayorMenorComponent },
  { path: 'preguntados', component: PreguntadosComponent },
  { path: 'pong', component: PongComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
