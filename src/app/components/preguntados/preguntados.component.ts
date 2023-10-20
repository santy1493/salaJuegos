import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  peliculas: Pelicula[];
  preguntaActual: any;
  puntaje: number;

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.puntaje = 0;
    this.peliculasService.getPeliculas().subscribe(res => {
      this.peliculas = res.results;
      console.log(this.peliculas);
      this.elegirPelicula();
    })
  }

  elegirPelicula() {
    let peliculaIndex = this.getRandomInt();
    console.log(peliculaIndex);
    let peliculaElegida = this.peliculas[peliculaIndex];

    let opcionesCount = 0;

    let opciones = [];

    while(opcionesCount < 3) {
      let opcion = this.peliculas[this.getRandomInt()];

      if(opcion.title != peliculaElegida.title) {

        let opcionRepetida = opciones.find(o => o.titulo == opcion.title);

        if(!opcionRepetida) {
          opciones.push({ titulo: opcion.title, correcto: false, incorrecto: false });
          opcionesCount++;
        }
      }
    }

    opciones.push({ titulo: peliculaElegida.title, correcto: false, incorrecto: false });

    opciones = this.shuffleArray(opciones);

    this.preguntaActual = {imagen: peliculaElegida.poster_path, titulo: peliculaElegida.title, opciones: opciones, respondida: false};
  }

  elegirOpcion(opcion: any) {
    if(opcion.titulo == this.preguntaActual.titulo) {
      opcion.correcto = true;
      this.preguntaActual.respondida = true;
      this.puntaje++;
    }
    else {
      opcion.incorrecto = true;
      this.preguntaActual.respondida = true;
    }
  }

  getRandomIntInclusive(): number {
    let peliculasCount = this.peliculas.length;
    return Math.floor(Math.random() * (peliculasCount - 0 + 1) + 0); // The maximum is inclusive and the minimum is inclusive
  }

  getRandomInt() {
    let min = 0;
    let max = this.peliculas.length;
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

}
