import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../services/service.index';
import { Shift } from '../../models/shift.model';
import swal from 'sweetalert';

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

  deleteShift(shift: Shift) {
    swal('Attention', 'are you sure you want to delete this record?', 'warning')
    .then((willDelete) => {
      if (willDelete) {
        this._shiftService.destroyShift(shift.id).subscribe( res => {
          this.getShifts();
        });
      }
    });
  }

}
