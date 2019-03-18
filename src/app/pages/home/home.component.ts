import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(
    public _authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this._authService.user;
  }

}
