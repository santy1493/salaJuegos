import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from 'src/app/components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from 'src/app/components/preguntados/preguntados.component';
import { JuegosComponent } from 'src/app/components/juegos/juegos.component';
import { MayorMenorComponent } from 'src/app/components/mayor-menor/mayor-menor.component';
import { PongComponent } from 'src/app/pong/pong.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    PreguntadosComponent,
    JuegosComponent,
    MayorMenorComponent,
    PongComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
