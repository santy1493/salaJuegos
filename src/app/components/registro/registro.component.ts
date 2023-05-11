import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  invalidRepeatPass: boolean = false;
  firebaseError: boolean = false;
  firebaseErrorText: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private error: FirebaseErrorService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    })
  }

  registrar() {
    const { email, password, repeatPassword } = this.form.getRawValue();

    if(password !== repeatPassword) {
      this.invalidRepeatPass = true;
      return;
    }

    this.invalidRepeatPass = false;
    this.loading = true;

    this.auth.register(email, password)
    .then(() => {
      this.loading = false;
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.loading = false;
      this.firebaseErrorText = this.error.firebaseError(error.code);
      this.firebaseError = true;
    });
  }

  
}