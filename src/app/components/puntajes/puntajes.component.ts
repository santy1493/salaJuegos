import { Component, OnInit } from '@angular/core';
import { PuntajeAhorcado } from 'src/app/models/puntaje-ahorcado';
import { PuntajePreguntados } from 'src/app/models/puntaje-preguntados';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {

  puntajesAhorcado: PuntajeAhorcado[];
  puntajesMayorMenor: PuntajePreguntados[];
  puntajesPreguntados: PuntajePreguntados[];
  puntajesPong: any;


  ahorcado = true;
  mayorMenor = false;
  preguntados = false;
  pong = false;

  constructor(
    private firestore: FirestoreService
  ) { }

  ngOnInit(): void {
    this.firestore.obtenerPuntajesMayorMenor().subscribe(res => {
      this.puntajesMayorMenor = res;
    });

    this.firestore.obtenerPuntajesPreguntados().subscribe(res => {
      this.puntajesPreguntados = res;
    });

    this.firestore.obtenerPuntajesAhorcado().subscribe(res => {
      this.puntajesAhorcado = res;
    });

    this.firestore.obtenerPuntajesPong().subscribe(res => {
      this.puntajesPong = res;
    });
  }

  cambiarTabla(opcion: number) {

    this.ahorcado = false;
    this.mayorMenor = false;
    this.preguntados = false;
    this.pong = false;

    switch(opcion) {
      case 1: this.ahorcado = true;
      break;
      case 2: this.mayorMenor = true;
      break;
      case 3: this.preguntados = true;
      break;
      case 4: this.pong = true;
      break;
      default: return;
        break;
    }
  }

  formatTime(tiempo: number) {
    let minutes = Math.floor(tiempo / 60);
    let seconds = tiempo - minutes * 60;
  
    return (minutes < 10 ? '0' + minutes : minutes) + ':' +(seconds < 10 ? '0' + seconds : seconds);
  }

}
