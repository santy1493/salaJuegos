import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/models/encuesta';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  puntos = 0;
  rangotouched = false;
  encuestaEnviada = false;

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
    telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
    ocupacion: ['', [Validators.required]],
    puntuacion: ['', [Validators.required]],
    favorito: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private router: Router,

  ) {}


  ngOnInit(): void {
  }

  actualizarPuntos() {
    console.log(this.puntos);

    this.rangotouched = true;
  }

  enviarEncuesta() {

    const { nombre, apellido, edad, telefono, ocupacion, puntuacion, favorito } = this.form.getRawValue();

    let encuesta: Encuesta = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        telefono: telefono,
        ocupacion: ocupacion,
        puntuacion: puntuacion,
        favorito: favorito
    }

    this.firestore.agregarEncuesta(encuesta)
    .then(() => {
      this.encuestaEnviada = true;
      //this.router.navigateByUrl('/bienvenido');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
