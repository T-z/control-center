import {Component, OnInit} from '@angular/core';
import {SharedService} from 'src/app/services/shared.service';
import {debounceTime} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {IProject} from '@stibs/api';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {

  settings = this.fb.group({
    timeout: this.fb.group({
      duration: undefined,
      show: false
    }),
    dashboard: this.fb.group({
      project: true,
      vehicle: true
    }),
    menu: this.fb.group({
      display: 'large'
    }),
    theme: this.fb.group({
      dark: false
    }),
  });

  constructor(private fb: FormBuilder, private sharedService: SharedService) {

    this.settings.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((values) => {
      values = Object.assign({lastactivity: {project: this.sharedService.currentProject}}, values);
      this.sharedService.currentSettings = values;
    });

  }

  ngOnInit() {

    const settings = this.sharedService.currentSettings;

    if (settings) {
      this.settings.patchValue(settings);
    }

  }

}
