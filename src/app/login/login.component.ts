import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/service.index';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  auth: Auth;

  constructor(
    public router: Router,
    public _authService: AuthService
  ) { }

  ngOnInit() {
  }

  logIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let auth = new Auth(form.value.email, form.value.password);

    this._authService.login(auth)
    .subscribe(() => { this.router.navigate(['/home']); });

  }

}
