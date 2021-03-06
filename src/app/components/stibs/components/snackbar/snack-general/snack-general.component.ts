import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snack-general',
  templateUrl: './snack-general.component.html',
  styleUrls: ['./snack-general.component.css']
})
export class SnackGeneralComponent implements OnInit {

  titel: string;
  succes: boolean;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.titel = this.data['titel'] ? this.data['titel'] : '';
    this.succes = this.data['status'] ? this.data['status'] : false;
  }
}
