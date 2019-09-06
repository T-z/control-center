import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/backendApi/project.service';
import { SnackarchivComponent } from '../snackbar/snackarchiv/snackarchiv.component';
import { SharedService } from 'src/app/services/shared.service';
import { MatSnackBar } from '@angular/material';
import { IProject } from '@stibs/api';

@Component({
  selector: 'app-archival',
  templateUrl: './archival.component.html',
  styleUrls: ['./archival.component.scss']
})
export class ArchivalComponent implements OnInit {

  projects: IProject[] = [];

  mode = 'indeterminate';

  is_in_process = false;
  error_inProcess = false;

  constructor(private sharedService: SharedService, public projectApi: ProjectService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  archivRequest = function () {
    this.is_in_process = true;
    this.error_inProcess = false;
    const proj = Object.assign({}, this.projects[this.projectFormControl.value]);
    this.projectApi.archiveProject(proj).subscribe((response) => {
      this.is_in_process = false;
      this.snackBar.openFromComponent(SnackarchivComponent, {
        data: {
          titel: this.projects[this.projectFormControl.value]['name'],
          status: true
        },
        duration: 2000,
      });
    }, (error) => {
      this.is_in_process = false;
      this.error_inProcess = true;
      this.snackBar.openFromComponent(SnackarchivComponent, {
        data: {
          titel: this.projects[this.projectFormControl.value]['name'],
          status: false
        },
        duration: 4000,
        panelClass: ['fail-snackbar']
      });
    });
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

}
