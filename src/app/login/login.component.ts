import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
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
    public _userService: UserService
  ) { }

  ngOnInit() {
  }

  logIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let auth = new Auth(form.value.email, form.value.password);

    this._userService.login(auth)
    .subscribe(() => {
      // nasty af
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 50);
     });

  }

}
