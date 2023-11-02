import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$ = this.auth.authState$.pipe(
    filter(state => state ? true : false)
  );
  
  isLoggedIn: boolean;
  esAdmin: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  async ngOnInit()  {
    
    this.auth.authState$.subscribe(res => {
      if(res != null ) {
        this.firestore.obtenerUsuario(res.email).subscribe(res => {
          if(res[0].rol == 'admin') {
            this.esAdmin = true;
          }
        });
      }
    })
    
  }

  async logout() {
    await this.auth.logout();
    window.location.reload();
    //this.router.navigate(['/login']);
  }
}
