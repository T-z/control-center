import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SnackGeneralComponent } from '../../components/snackbar/snack-general/snack-general.component';
import { NodeMetaService } from '../../../../services/backendApi/node-meta.service';
import { SelectionModel } from '@angular/cdk/collections';
import { IProject, INode } from '@stibs/api';

@Component({
  selector: 'app-assignproject',
  templateUrl: './assignproject.component.html',
  styleUrls: ['./assignproject.component.scss']
})
export class AssignprojectComponent implements OnInit {

  displayedColumns: string[] = ['Checkbox', 'Project'];
  dataSource = new MatTableDataSource<Partial<IProject>>();
  selection = new SelectionModel<Partial<IProject>>(true, []);

  selectedProjects: Partial<IProject>[];

  constructor(private dialog: MatDialog, private nodeMetaApi: NodeMetaService, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public node: INode) {
  }

  ngOnInit() {

    this.selectedProjects = [];

    this.nodeMetaApi.getNodeProjectAssignment(this.node.name).subscribe((data) => {

      this.dataSource = new MatTableDataSource(data);

      data.forEach(item => {
        if (item.active) {
          this.selection.select(item);
          this.selectedProjects.push(item);
        }
      });

    });
  }

  close() {
    this.dialog.closeAll();
  }

  assignProject() {

    this.nodeMetaApi.assignNodeProject(this.node.name, this.selectedProjects).subscribe(() => {

      this.close();

      this.snackBar.openFromComponent(SnackGeneralComponent, {
        data: {
          titel: 'Projeckt-Zuordnung',
          status: true
        },
        duration: 2000,
      });

    }, error => {
      this.snackBar.openFromComponent(SnackGeneralComponent, {
        data: {
          titel: 'Projeckt-Zuordnung',
          status: false
        },
        duration: 2000,
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectedProjects = [...this.selection.selected];
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(project?: Partial<IProject>, index?: number): string {
    if (!project) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(project) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  checkFunction(project: Partial<IProject>) {
    const index = this.selectedProjects.findIndex((item) => item.id === project.id);
    if (index < 0) {
      this.selectedProjects.push(project);
    } else {
      this.selectedProjects.splice(index, 1);
    }
  }



}
