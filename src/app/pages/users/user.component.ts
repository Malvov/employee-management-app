import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../../models/employee.model';
import { User } from '../..//models/user.model';
import { UserService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  employee = new Employee('', '', '', false, '');
  user = new User('', '', '', '', '');
  userId: string;
  constructor(
    public _userService: UserService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.userId = params['id'];
    });
  }

  saveUser(form: NgForm) {
    if (form.valid && this.userId ===  'new') {
      this._userService.createUser(this.user, this.employee).subscribe((user: any) => {
        console.log(user);
      });
      return;
    }
  }
}
