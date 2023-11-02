import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Log } from '../models/log';
import { Mensaje } from '../models/mensaje';
import { Usuario } from '../models/usuario';
import { Encuesta } from '../models/encuesta';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  agregarLog(log: Log) {
    const logRef = collection(this.firestore, 'logs');
    return addDoc(logRef, log).catch(err => {
      console.log(err);
    });
  }

  agregarMensaje(mensaje: Mensaje) {
    const mensajeRef = collection(this.firestore, 'mensajes');
    return addDoc(mensajeRef, mensaje).catch(err => {
      console.log(err);
    });
  }

  obtenerMensajes(): Observable<Mensaje[]> {
    const mensajesRef = collection(this.firestore, 'mensajes');
    return collectionData(mensajesRef, { idField: 'id'}) as Observable<Mensaje[]>;
  }

  agregarUsuario(usuario: Usuario) {
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario).catch(err => {
      console.log(err);
    });
  }

  obtenerUsuario(email: string): Observable<Usuario[]> {
    const usuarioRef = collection(this.firestore, 'usuarios');
    const q = query(usuarioRef, where('email', '==', email));
    return collectionData(q, { idField: 'id'}) as Observable<Usuario[]>;
  }

  agregarEncuesta(encuesta: Encuesta) {
    const encuestaRef = collection(this.firestore, 'encuestas');
    return addDoc(encuestaRef, encuesta).catch(err => {
      console.log(err);
    });
  }

  obtenerEncuestas(): Observable<Encuesta[]> {
    const encuestaRef = collection(this.firestore, 'encuestas');
    return collectionData(encuestaRef, { idField: 'id'}) as Observable<Encuesta[]>;
  }

  /*obtenerPublicaciones(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    return collectionData(publicacionRef, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  obtenerPublicacionesLindas(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    const q = query(publicacionRef, where('lindo', '==', true));
    return collectionData(q, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  obtenerPublicacionesFeas(): Observable<Publicacion[]> {
    const publicacionRef = collection(this.firestore, 'publicaciones');
    const q = query(publicacionRef, where('lindo', '==', false));
    return collectionData(q, { idField: 'id'}) as Observable<Publicacion[]>;
  }

  eliminarPublicacion(publicacion: Publicacion) {
    const publicacionRef = doc(this.firestore, `publicaciones/${publicacion.id}`);
    return deleteDoc(publicacionRef);
  }*/

  /*createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }*/
}
