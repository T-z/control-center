import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-snackedituser',
  templateUrl: './snackedituser.component.html',
  styleUrls: ['./snackedituser.component.css']
})
export class SnackedituserComponent implements OnInit {

  user_name: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.user_name = this.data ;
  }

}
