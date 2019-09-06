import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snackarchiv',
  templateUrl: './snackarchiv.component.html',
  styleUrls: ['./snackarchiv.component.css']
})
export class SnackarchivComponent implements OnInit {

  titel: string;
  succes: boolean;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.titel = this.data['titel'] ? this.data['titel'] : '';
    this.succes = this.data['status'] ? this.data['status'] : false;
  }

}
