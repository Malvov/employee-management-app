import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

}
