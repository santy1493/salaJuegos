import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  async logout() {
    await this.auth.logout();
    window.location.reload();
    //this.router.navigate(['/login']);
  }
}
