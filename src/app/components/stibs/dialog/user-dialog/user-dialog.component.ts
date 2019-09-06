import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../../../../services/backendApi/user.service';
import {AUTHORITY, IUser} from '@stibs/api';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserComponent implements OnInit {

  form = this.formBuilder.group({
    id: undefined,
    forename: [undefined, Validators.required],
    surname: [undefined, Validators.required],
    username: [undefined, Validators.required],
    email: [undefined, [Validators.required, Validators.email]],
    department: undefined,
    authorityName: [undefined, Validators.required]
  });

  signatureControl = new FormControl();

  AuthAdministrator = AUTHORITY.ADMINISTRATOR;
  AuthTeam = AUTHORITY.TEAM;
  AuthComisioning = AUTHORITY.COMMISSIONING;
  AuthProduction = AUTHORITY.PRODUCTION;

  constructor(public dialogRef: MatDialogRef<UserComponent>, private userApi: UserService, public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public user: IUser, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    if (this.user) {
      this.form.patchValue(this.user);
    }

  }

  hasSignature(): boolean {
    return this.user && this.user.signature;
  }

  compareFn(authority1: AUTHORITY, authority2: AUTHORITY): boolean {
    return authority1 && authority2 && authority1 === authority2;
  }

  saveUser() {

    if (this.form.valid) {

      const data = new FormData();

      // first append all user form items
      for (const item of Object.keys(this.form.value)) {

        if (!this.form.value[item]) {
          continue;
        }

        data.append(item, this.form.value[item]);

      }

      if (this.signatureControl.value) {
        data.append('signature', this.signatureControl.value[0]);
      }

      if (this.user) {

        this.userApi.editUser(data).subscribe(() => {
          Object.assign(this.user, this.form.value);
          this.dialogRef.close(this.form.value);
        });

      } else {

        this.userApi.addUser(data).subscribe(() => {
          this.dialogRef.close(this.form.value);
        });

      }

    }
  }
}
