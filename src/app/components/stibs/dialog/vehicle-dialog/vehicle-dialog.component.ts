import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProject, IVehicle} from '@stibs/api';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialog, MatSnackBar} from '@angular/material';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {SnackGeneralComponent} from '../../components/snackbar/snack-general/snack-general.component';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})


export class VehicleDialogComponent implements OnInit {

  form: FormGroup;
  newVehicle: IVehicle;
  project: IProject;
  startDate = new Date(2018, 0, 1);

  @ViewChild('startPicker', {static: true}) startDatePicker: MatDatepicker<any>;
  @ViewChild('endPicker', {static: true}) endDatePicker: MatDatepicker<any>;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private projectApi: ProjectService,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.project = Object.assign({}, data);
  }

  createFormGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      type: '',
      project: [{value: this.project['name'], disabled: true}, Validators.required]
    });
  }

  ngOnInit() {
    this.form = this.createFormGroup();
  }

  add_vehicle() {
    this.newVehicle = Object.assign({
      projectId: this.project['id'],
      startDate: this.startDatePicker._selected,
      endDate: this.endDatePicker._selected
    }, this.form.value);

    this.projectApi.addVehicle(this.newVehicle).subscribe(() => {
      this.close_dialog();
    }, (error) => {
      this.snackBar.openFromComponent(SnackGeneralComponent, {
        data: {
          titel: 'Anlegen des Fahrzeuges ',
          status: false
        },
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    });
  }

  close_dialog() {
    this.dialog.closeAll();
  }
}
