import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/service.index';
import { Shift } from '../../models/shift.model';


@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styles: []
})
export class ShiftsComponent implements OnInit {

  shifts: Shift[] = [];

  constructor(
    public _shiftService: ShiftService
  ) { }

  ngOnInit() {
    this.getShifts();
  }

  getShifts() {
    this._shiftService.getShifts().subscribe((shifts: any) => {
      this.shifts = shifts;
      console.log(this.shifts);
    });
  }

}
