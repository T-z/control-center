import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snackadduser',
  templateUrl: './snackadduser.component.html',
  styleUrls: ['./snackadduser.component.css']
})
export class SnackadduserComponent implements OnInit {

  user_name: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    this.user_name = `${this.data['forename']},${this.data['surname']}`;
  }

}
