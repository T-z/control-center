import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {IVehicle} from '@stibs/api';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  hide_box = true;
  hide_spinner = true;
  dateNow: Date;

  constructor(public projectApi: ProjectService) {
  }

  ngOnInit() {
  }

  switchBoxVisibility() {
    this.hide_spinner = (this.hide_spinner === true ? false : true);
    this.hide_box = !this.hide_spinner;
  }

  zipVehicleData(car: IVehicle) {
    this.switchBoxVisibility();
  }

}
