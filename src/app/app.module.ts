import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import {} from '@angular/material/form-field';
import {} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';
import { ToastrModule } from 'ngx-toastr';
import { JuegosComponent } from './components/juegos/juegos.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { HttpClientModule } from '@angular/common/http';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { PongComponent } from './pong/pong.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    QuienSoyComponent,
    PuntajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }