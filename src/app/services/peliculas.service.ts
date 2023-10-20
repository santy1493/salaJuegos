import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeliculasResponse } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(
    private http: HttpClient
  ) { }

  getPeliculas(): Observable<PeliculasResponse> {
    return this.http.get<PeliculasResponse>('https://api.themoviedb.org/3/discover/movie?api_key=d52285be4edbdbfe1f04d9f780db1925&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc')
  }

  //d52285be4edbdbfe1f04d9f780db1925

  //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTIyODViZTRlZGJkYmZlMWYwNGQ5Zjc4MGRiMTkyNSIsInN1YiI6IjY1MzAxNzAxMWZiOTRmMDBjNTA1ZGJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yaKvXVYry4RrSrLAslxKnq5yh4mZoY3mnuOaGHUQaqI
}
