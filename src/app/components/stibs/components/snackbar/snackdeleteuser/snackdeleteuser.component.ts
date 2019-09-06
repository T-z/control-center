import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snackdeleteuser',
  templateUrl: './snackdeleteuser.component.html',
  styleUrls: ['./snackdeleteuser.component.css']
})
export class SnackdeleteuserComponent implements OnInit {

  user_name: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    this.user_name = `${this.data['name']}}`;
  }

}
