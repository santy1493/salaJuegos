import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Mensaje } from 'src/app/models/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  nuevoMensaje: string = "";
  mensajes: Mensaje[];
  currentUser: string;
  scrollFirst: boolean = true;

  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService
  ){
    
  }

  async ngOnInit() {

    this.user$.subscribe(usr => {
      this.currentUser = usr.email;

      this.firestore.obtenerMensajes().subscribe(res => {
        this.mensajes = res.sort((a,b) => a.timespan - b.timespan);
        this.scrollFirstTime();
      });
    });
  }

  enviarMensaje() {

    if(this.nuevoMensaje != '') {
      let mensaje: Mensaje = {
        usuario: this.currentUser,
        timespan: Date.now(),
        mensaje: this.nuevoMensaje
      }
  
      this.firestore.agregarMensaje(mensaje);
  
      this.nuevoMensaje = "";
  
      setTimeout(() => {
        this.scroll();
      }, 200);
    }
    //console.log(this.nuevoMensaje);
  }

  scroll() {
    let elements = document.getElementsByClassName('chat-bubble-container');
    let ultimo: any = elements[elements.length-1];
    let toppos = ultimo.offsetTop;

    document.getElementById('card-body').scrollTop = toppos;
  }

  formatearFecha(fecha: string) {
    let date = new Date(parseInt(fecha));
    //return date.toLocaleString('en-GB').replace(',', '');
    return date.toLocaleDateString('en-GB');
  }

  formatDateTime(timespan: string) {
    let date = new Date(parseInt(timespan));
    let formatedDate = date.toLocaleString('en-GB').replace(',', '');
    return formatedDate.substring(0, formatedDate.length - 3);
  }

  formatearUsuario(username: string) {
    if(username.includes('@')){
      return username.split('@')[0];
    }
    else {
      return username;
    }
  }

  scrollFirstTime() {
    if(this.scrollFirst) {
      setTimeout(() => {
        this.scroll();
        this.scrollFirst = false;
      }, 200);
    }
  }

}
