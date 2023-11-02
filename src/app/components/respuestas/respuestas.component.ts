import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  respuestas: Encuesta[];

  constructor(
    private firestore: FirestoreService
  ) { }

  ngOnInit(): void {
    this.firestore.obtenerEncuestas().subscribe(res => {
      this.respuestas = res;
    })
  }

}
