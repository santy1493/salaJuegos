import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  imgCartaActual: string;
  cartaAnterior: number;
  puntos: number;
  intentos: number;
  inicio: boolean;
  esMayor: boolean;
  cartas: any[] = [
    {
      numero: 1,
      imagen: "../../../assets/img/cartas/Oros_01.jpg"
    },
    {
      numero: 2,
      imagen: "../../../assets/img/cartas/Oros_02.jpg"
    },
    {
      numero: 3,
      imagen: "../../../assets/img/cartas/Oros_03.jpg"
    },
    {
      numero: 4,
      imagen: "../../../assets/img/cartas/Oros_04.jpg"
    },
    {
      numero: 5,
      imagen: "../../../assets/img/cartas/Oros_05.jpg"
    },
    {
      numero: 6,
      imagen: "../../../assets/img/cartas/Oros_06.jpg"
    },
    {
      numero: 7,
      imagen: "../../../assets/img/cartas/Oros_07.jpg"
    },
    {
      numero: 8,
      imagen: "../../../assets/img/cartas/Oros_08.jpg"
    },
    {
      numero: 9,
      imagen: "../../../assets/img/cartas/Oros_09.jpg"
    },
    {
      numero: 10,
      imagen: "../../../assets/img/cartas/Oros_10.jpg"
    },
    {
      numero: 11,
      imagen: "../../../assets/img/cartas/Oros_11.jpg"
    },
    {
      numero: 12,
      imagen: "../../../assets/img/cartas/Oros_12.jpg"
    }
  ]

  constructor(
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.puntos = 0;
    this.intentos = 0;
    this.inicio = false;
    this.esMayor = false;
    this.imgCartaActual = "";
  }

  comenzar() {
    if(!this.inicio) {
      this.inicio = true;
      this.primeraCarta();
    }
  }

  mayor(){
    this.esMayor = true;
    setTimeout(()=>{
      this.darVuelta();
    }, 500)
  }

  menor(){
    this.esMayor = false;
    setTimeout(()=>{
      this.darVuelta();
    }, 500)
  }

  darVuelta() {

    let numCartaActual;

    do {
      numCartaActual = this.getRandomIntInclusive()
    } while (numCartaActual == this.cartaAnterior);
    
    console.log(numCartaActual);

    let cartaActual = this.cartas.find(c => c.numero === numCartaActual);
    this.imgCartaActual = cartaActual.imagen;

    if(numCartaActual > this.cartaAnterior && this.esMayor == true) {
      this.toast.showSuccess('Correcto!');
      this.puntos++;
    }
    else if(numCartaActual > this.cartaAnterior && this.esMayor == false) {
      this.toast.showError('Incorrecto');
    }
    else if(numCartaActual < this.cartaAnterior && this.esMayor == false) {
      this.toast.showSuccess('Correcto!');
      this.puntos++;

    }
    else if(numCartaActual < this.cartaAnterior && this.esMayor == true) {
      this.toast.showError('Incorrecto');
    }

    this.cartaAnterior = numCartaActual;
  }

  primeraCarta() {
    let numCartaActual = this.getRandomIntInclusive()
    console.log(numCartaActual);

    let cartaActual = this.cartas.find(c => c.numero === numCartaActual);
    this.imgCartaActual = cartaActual.imagen;
    this.cartaAnterior = cartaActual.numero;
  }

  getRandomIntInclusive() {
    return Math.floor(Math.random() * (12 - 1 + 1) + 1); // The maximum is inclusive and the minimum is inclusive
  }

}
