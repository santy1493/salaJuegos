import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { RespuestasComponent } from 'src/app/components/respuestas/respuestas.component';

const routes: Routes = [
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'respuestas', component: RespuestasComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
