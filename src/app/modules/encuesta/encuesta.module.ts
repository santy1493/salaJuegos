import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { RespuestasComponent } from 'src/app/components/respuestas/respuestas.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EncuestaComponent,
    RespuestasComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    ReactiveFormsModule
  ]
})
export class EncuestaModule { }
