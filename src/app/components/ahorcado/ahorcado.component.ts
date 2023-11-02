import { Component, OnInit } from '@angular/core';
import { PuntajeAhorcado } from 'src/app/models/puntaje-ahorcado';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService
  ) { }

  palabra: string;
  ahorcadoImg: string = ''
  MAX_ERRORES: number;
  perdido: boolean;
  ganado: boolean;

  caracteres: any[];

  letrasPalabra: any[];

  imagenes: any[] = [
    {
      numero: 0,
      imagen: "../../../assets/img/ahorcado/ahorcado_0.jpg"
    },
    {
      numero: 1,
      imagen: "../../../assets/img/ahorcado/ahorcado_1.jpg"
    },
    {
      numero: 2,
      imagen: "../../../assets/img/ahorcado/ahorcado_2.jpg"
    },
    {
      numero: 3,
      imagen: "../../../assets/img/ahorcado/ahorcado_3.jpg"
    },
    {
      numero: 4,
      imagen: "../../../assets/img/ahorcado/ahorcado_4.jpg"
    },
    {
      numero: 5,
      imagen: "../../../assets/img/ahorcado/ahorcado_5.jpg"
    },
    {
      numero: 6,
      imagen: "../../../assets/img/ahorcado/ahorcado_6.jpg"
    }
  ]

  palabras: string[] = [
    'auto', 'arbol', 'departamento', 'cebra', 'papelera'
  ]

  letrasElegidas: string[];

  letraErroneas: number;

  ngOnInit(): void {
    this.letraErroneas = 0;
    this.MAX_ERRORES = 6;
    this.letrasElegidas = [];
    this.palabra = this.elegirPalabraAleatoria();
    this.ahorcadoImg = '../../../assets/img/ahorcado/ahorcado_0.jpg';
    this.perdido = false;
    this.ganado = false;
    this.letrasPalabra = [];
    this.dividirPalabra();
    this.reiniciarCaracteres();
  }

  precionarLetra() {
    const letra = prompt('Elegir letra');
    this.elegirLetra(letra);
  }

  elegirLetra(letra: string) {
    if(!this.perdido && !this.ganado) {
      if(!letra || this.letrasElegidas.includes(letra.toLowerCase())){
        return;
      }
      else {
        if(this.palabra.toLowerCase().includes(letra.toLowerCase())) {
          let letrasAdivinadas = this.letrasPalabra.filter(l => l.letra == letra.toLowerCase());
          letrasAdivinadas.forEach(l => { l.adivinado = true; });
        }
        else {
          this.letraErroneas++;
          let ahorcadoActual = this.imagenes.find(c => c.numero === this.letraErroneas);
          this.ahorcadoImg = ahorcadoActual.imagen;
        }
  
        this.letrasElegidas.push(letra.toLowerCase());

        if(this.letraErroneas == this.MAX_ERRORES) {
          this.perdido = true;
          this.guardarResultado();
        }

        let quedanLetras = this.letrasPalabra.filter(l => l.adivinado == false);

        if(quedanLetras != null && quedanLetras.length > 0) {

        }
        else {
          this.ganado = true;
          this.guardarResultado();
          this.ahorcadoImg = '../../../assets/img/ahorcado/ahorcado_7.jpg';
        }

      }
    }
  }

  reiniciar() {
    this.letraErroneas = 0;
    this.MAX_ERRORES = 6;
    this.letrasElegidas = [];
    this.palabra = this.elegirPalabraAleatoria();
    this.ahorcadoImg = '../../../assets/img/ahorcado/ahorcado_0.jpg';
    this.perdido = false;
    this.ganado = false;
    this.letrasPalabra = [];
    this.dividirPalabra();
    this.reiniciarCaracteres();
  }

  elegirPalabraAleatoria() {
    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  }

  dividirPalabra() {
    for (let i=0; i < this.palabra.length; i++) {
      const element = {letra: this.palabra[i], adivinado: false}
      this.letrasPalabra.push(element);
    }
  }

  onKeyClick(key) {
    if(!key.usado) {
      this.elegirLetra(key.valor);
      let letraUsada = this.caracteres.find(c => c.valor == key.valor);
      letraUsada.usado = true;
    }
    
  }

  guardarResultado() {
    var today = new Date();
      var date = today.toLocaleString('en-GB');

      this.auth.authState$.subscribe(res => {
        let puntajeFinal: PuntajeAhorcado = {
          fecha: date,
          usuario: res.email,
          errores: this.letraErroneas,
          ganado: this.ganado
        }
        console.log(puntajeFinal);
        this.firestore.agregarPuntajeAhorcado(puntajeFinal);
      });
  }

  reiniciarCaracteres(){
    this.caracteres = [
      {
          valor: "q",
          usado: false
      },
      {
          valor: "w",
          usado: false
      },
      {
          valor: "e",
          usado: false
      },
      {
          valor: "r",
          usado: false
      },
      {
          valor: "t",
          usado: false
      },
      {
          valor: "y",
          usado: false
      },
      {
        valor: "u",
          usado: false
      },
      {
        valor: "i",
          usado: false
      },
      {
        valor: "o",
          usado: false
      },
      {
        valor: "p",
          usado: false
      },
      {
        valor: "a",
          usado: false
      },
      {
        valor: "s",
          usado: false
      },
      {
        valor: "d",
          usado: false
      },
      {
        valor: "f",
          usado: false
      },
      {
        valor: "g",
          usado: false
      },
      {
        valor: "h",
          usado: false
      },
      {
        valor: "j",
          usado: false
      },
      {
        valor: "k",
          usado: false
      },
      {
        valor: "l",
          usado: false
      },
      {
        valor: "ñ",
          usado: false
      },
      {
        valor: "z",
          usado: false
      },
      {
        valor: "x",
          usado: false
      },
      {
        valor: "c",
          usado: false
      },
      {
        valor: "v",
          usado: false
      },
      {
        valor: "b",
          usado: false
      },
      {
        valor: "n",
          usado: false
      },
      {
        valor: "m",
          usado: false
      }
  ]
  }

}
