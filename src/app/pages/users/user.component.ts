import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../../models/employee.model';
import { User } from '../..//models/user.model';
import { UserService, EmployeeService } from '../../services/service.index';
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
  employeeId: string;
  constructor(
    public _userService: UserService,
    public _employeeService: EmployeeService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.userId = params['id'];
      if (this.userId !== 'new') {
        console.log(this.userId);
        this._userService.getUser(this.userId).subscribe((user: any) => {
          console.log(user);
          this.user = new User(user.attributes.username, user.attributes.email, '', 
          user.attributes.role, user.id);
          this.employeeId = user.relationships.employee.data.id;
          this.getEmployee(this.employeeId);
        });
      } else {
        this.employee = new Employee('', '', '', false, '');
        this.user = new User('', '', '', '', '');
      }
    });
  }

  saveUser(form: NgForm) {
    if (form.valid && this.userId ===  'new') {
      this._userService.createUser(this.user, this.employee).subscribe((user: any) => {
        this.router.navigate(['/employees']);
      });
      return;
    }
    if (form.valid && this.userId !== 'new') {
      this._userService.updateUser(this.user, this.employee).subscribe((user: any) => {
        this.router.navigate(['/emmployees']);
      });
      return;
    }
  }

  getEmployee(employeeId: string) {
    this._employeeService.getEmployee(employeeId).subscribe((employee: any) => {
      this.employee = new Employee(employee.attributes.firstName, employee.attributes.lastName,
        new Date(employee.attributes.entryDate).toString(), employee.attributes.active, employee.id);
        console.log(this.employee.entryDate);
    });
  }
}
