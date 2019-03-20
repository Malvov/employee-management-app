import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit() {
  }
}
