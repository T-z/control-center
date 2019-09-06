import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef, MatSnackBar} from '@angular/material';
import {IEquipment, isEquipmentModel, IUser} from '@stibs/api';
import {FormBuilder, Validators} from '@angular/forms';
import {EquipmentService} from '../../../../services/backendApi/equipment.service';
import {UserService} from '../../../../services/backendApi/user.service';
import {SnackGeneralComponent} from '../../components/snackbar/snack-general/snack-general.component';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})
export class EquipmentDialogComponent implements OnInit {

  startDate = new Date(2018, 0, 1);
  users: IUser[];
  form = this.formBuilder.group({
    id: undefined,
    name: [undefined, Validators.required],
    accuracy: [undefined, Validators.required],
    calibrationDate: [undefined, Validators.required],
    interval: [undefined, Validators.required],
    number: [undefined, Validators.required],
    location: undefined,
    type: undefined,
    manufacturer: undefined,
    userId: undefined,
    description: undefined
  });

  @ViewChild('calibrationDatePicker', {static: true}) calibrationDatePicker: MatDatepicker<any>;

  constructor(public dialogRef: MatDialogRef<EquipmentDialogComponent>, public snackBar: MatSnackBar,
              private equipmentApi: EquipmentService, private userApi: UserService,
              @Inject(MAT_DIALOG_DATA) public equipment: IEquipment, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userApi.getUserList().subscribe((itemList) => {
      this.users = itemList[0];
    });
    if (this.equipment) {
      this.form.patchValue(Object.assign({
        userId: this.equipment && this.equipment.user ? this.equipment.user.id : undefined
      }, this.equipment));
    }

    console.log(this.equipment);
  }

  saveEquipment() {
    if (this.form.valid) {

      if (this.equipment) {

        const customEquipment = Object.assign({}, this.form.value);


        this.equipmentApi.editEquipment(customEquipment).subscribe(() => {
          Object.assign(this.equipment, customEquipment);
          this.dialogRef.close(this.form.value);
        }, error1 => {
          this.snackBar.openFromComponent(SnackGeneralComponent, {
            data: {
              titel: 'Bearbeitung der Prüfmittel ',
              status: false
            },
            duration: 2000,
            panelClass: ['red-snackbar']
          });
        });

      } else {
        this.equipmentApi.addEquipment(this.form.value).subscribe(() => {
          console.log(this.form.value);
          this.dialogRef.close(this.form.value);
        });

      }

    }

  }

}
