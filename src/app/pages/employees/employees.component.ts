import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/service.index';
import { Employee } from '../../models/employee.model';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: []
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  constructor(
    public _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe((employees: any) => {
      this.employees = employees;
    });
  }

}
