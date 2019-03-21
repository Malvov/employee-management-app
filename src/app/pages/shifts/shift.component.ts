import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Shift } from '../../models/shift.model';
import { Employee } from '../../models/employee.model';
import { EmployeeService, ShiftService } from '../../services/service.index';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styles: []
})
export class ShiftComponent implements OnInit {

  shift = new Shift('', '', '', '', '');
  employees: any[] = [];
  shiftId: string;

  constructor(
    public _employeeService: EmployeeService,
    public _shiftService: ShiftService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.activatedRoute.params.subscribe(params => {
      this.shiftId = params['id'];
      if (this.shiftId !== 'new') {
        this._shiftService.getShift(this.shiftId).subscribe((shift: any) => {
          this.shift = new Shift(shift.attributes.date, shift.attributes.checkIn, shift.attributes.checkOut, shift.attributes.employeeId,
            shift.attributes.comment, shift.id);
            console.log(this.shift);
        });
      } else {
        this.shift = new Shift('', '', '', '', '');
      }
    });
  }

  saveShift(form: NgForm) {
    if (form.valid && this.shiftId === 'new') {
      this._shiftService.createShift(this.shift).subscribe((res: any) => {
        this.router.navigate(['/shifts']);
      });
      return;
    }

    if (form.valid && this.shiftId !== 'new') {
      this._shiftService.updateShift(this.shift).subscribe((res: any) => {
        this.router.navigate(['/shifts']);
      });
      return;
    }
   }

  getEmployees() {
    this._employeeService.getEmployees().subscribe((employees: any) => {
      this.employees = employees;
      console.log(this.employees);
    });
  }

}
