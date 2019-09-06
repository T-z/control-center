import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {EquipmentDialogComponent} from '../../dialog/equipment-dialog/equipment-dialog.component';
import {EquipmentService} from '../../../../services/backendApi/equipment.service';
import {DEFAULT_PAGE_SIZE} from 'src/app/services/shared.service';
import {dayBetween, formatUsername} from 'src/app/utils/utils';
import {IEquipment, IUser} from '@stibs/api';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Number', 'CalibrationDate', 'Interval', 'Accuracy', 'User', 'Edit', 'Delete', 'More'];
  dataSource = new MatTableDataSource<IEquipment>();
  searchControl = new FormControl();

  @ViewChild('deleteEquipmentDialogTemplate', {static: true}) deleteEquipmentDialogTemplate: TemplateRef<any>;
  @ViewChild('moreInfoTemplate', {static: true}) moreInfoTemplate: TemplateRef<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private equipmentApi: EquipmentService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.loadEquipments();

    this.searchControl.valueChanges.pipe(
      debounceTime(250)
    ).subscribe((value) => {

      if (value) {
        this.loadEquipments(this.currentFilter, this.currentSort);
      } else {
        this.loadEquipments();
      }

    });

  }

  openMoreInfoEquipmentDialog(rowEquipment: IEquipment) {
    this.dialog.open(this.moreInfoTemplate, {
      data: rowEquipment
    });
  }

  openAddEquipmentDialog() {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEquipments();
      }
    });
  }

  openEditEquipmentDialog(equipment: IEquipment) {
    this.dialog.open(EquipmentDialogComponent, {
      data: equipment,
      hasBackdrop: false
    });
  }

  openDeleteEquipmentDialog(equipment: IEquipment) {
    const dialogRef = this.dialog.open(this.deleteEquipmentDialogTemplate, {
      data: equipment
    });
    dialogRef.afterClosed().subscribe((choice) => {
      if (choice) {
        this.equipmentApi.deleteEquipment(equipment.id).subscribe(() => {
          this.loadEquipments(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
        });
      }
    });
  }

  get currentFilter() {
    if (this.searchControl && this.searchControl.value) {
      return {
        name: this.searchControl.value,
        number: this.searchControl.value
      };
    }
  }

  get currentSort() {
    if (this.sort && this.sort.active && this.sort.direction) {
      return {
        [this.sort.active]: this.sort.direction.toUpperCase()
      };
    }
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  private refresh() {
    this.loadEquipments(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
  }

  private async loadEquipments(filter?: any, sort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [equipments, total] = await this.equipmentApi.getEquipmentList(offset, limit).toPromise();
    this.dataSource = new MatTableDataSource<IEquipment>(equipments);
    this.paginator.length = total;

  }

  onSortData(event: any) {
    this.refresh();
  }

  onPageEquipmentChange(event: any) {
    this.refresh();
  }

  prepareUserName(user: IUser): string {
    return formatUsername(user);
  }

  isDeadlineOver(startDate: string, interval: number): boolean {
    const start = new Date(startDate);
    const deadline = new Date(start.getTime() + (1000 * 60 * 60 * 24 * interval));
    return (dayBetween(deadline, new Date()) >= 0);
  }

  setDeadline(startDate: string, interval: number) {
    const start = new Date(startDate);
    const deadline = new Date(start.getTime() + (1000 * 60 * 60 * 24 * interval));
    return deadline;
  }

}
