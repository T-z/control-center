import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../../services/backendApi/user.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  snackBarRef: MatSnackBarRef<any>;

  resetForm = this.formBuilder.group({
    token: undefined,
    password: ['', [Validators.required]],
    confirm: ['', [Validators.required]]
  });

  @ViewChild('infoTemplate', { static: true }) infoTemplate: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private userApi: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.resetForm.patchValue({
      token: this.route.snapshot.paramMap.get('token')
    });

  }


  reset() {

    if (this.resetForm.valid) {

      this.userApi.setPwd(this.resetForm.value).subscribe(() => {
        this.snackBarRef = this.snackBar.openFromTemplate(this.infoTemplate);
      });

    }

  }

  routeToLogin() {
    this.router.navigate(['/login']);
    this.snackBarRef.closeWithAction();
  }

}
