import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ProjectService} from '../../../../services/backendApi/project.service';

@Component({
  selector: 'app-startingdate',
  templateUrl: './settingdate.component.html',
  styleUrls: ['./settingdate.component.scss']
})
export class SettingdateComponent implements OnInit {
  customDate = {
    start: undefined,
    end: undefined
  };

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private projectApi: ProjectService) {
  }

  ngOnInit() {
    this.customDate.start = new Date(this.data.start);
    this.customDate.end = new Date(this.data.end);
  }

  set_date() {
    console.log(this.customDate.start , this.customDate.end);
     this.projectApi.setVehicleProcessingDate(this.data.vehicle['id'], this.customDate.start , this.customDate.end).subscribe((next)=>{
       console.log(next);
     });
  }

}
