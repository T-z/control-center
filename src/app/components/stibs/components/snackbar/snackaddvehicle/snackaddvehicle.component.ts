import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snackaddvehicle',
  templateUrl: './snackaddvehicle.component.html',
  styleUrls: ['./snackaddvehicle.component.css']
})
export class SnackaddvehicleComponent implements OnInit {
  vehicle_name: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.vehicle_name = `${this.data['name']}-${this.data['number']}`;
  }

}
