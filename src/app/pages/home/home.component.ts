import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Employee } from '../../models/employee.model';
import { Shift } from '../../models/shift.model';
import { UserService, ShiftService, EmployeeService } from '../../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  user: User;
  employee: Employee;
  shifts: Shift[] = [];
  constructor(
    public _userService: UserService,
    public _shiftService: ShiftService,
    public _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.user = this._userService.user;
    this.getShifts();
    this.getEmployee(this._userService.employeeId);
  }

  getShifts() {
    this._shiftService.getShifts().subscribe((shifts: any) => {
      this.shifts = shifts;
      console.log(this.shifts);
    });
  }

  getEmployee(employeeId: string) {
    this._employeeService.getEmployee(employeeId).subscribe((employee: any) => {
      this.employee = new Employee(employee.attributes.firstName, 
        employee.attributes.lastName, employee.attributes.entryDate, employee.attributes.active);
    });
  }


}
