import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Log } from 'src/app/models/log';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  firebaseError: boolean = false;
  firebaseErrorText: string;
  log: Log;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private error: FirebaseErrorService,
    private firestore: FirestoreService
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  login() {
    this.firebaseError = false;
    this.loading = true;

    if(this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.auth.login(email, password)
      .then(() => {

        this.log = {
          usuario: email,
          timespan: Date.now()
        }

        this.firestore.agregarLog(this.log);

        this.form.reset();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.loading = false;
        this.firebaseErrorText = this.error.firebaseError(error.code);
        this.firebaseError = true;
      });
    } else {

    }
  }
  
  
  completarLogin() {
    if(this.form.controls['email']) {
      this.form.controls['email'].setValue('test@test.com');
    }
    if(this.form.controls['password']) {
      this.form.controls['password'].setValue('111111');
    }
  }

}
