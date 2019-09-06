import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AssignprojectComponent } from '../../dialog/assignproject/assignproject.component';
import { NodeMetaService } from '../../../../services/backendApi/node-meta.service';
import { DEFAULT_PAGE_SIZE } from 'src/app/services/shared.service';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { INode } from '@stibs/api';

@Component({
  selector: 'app-test-unit',
  templateUrl: './test-unit.component.html',
  styleUrls: ['./test-unit.component.scss']
})
export class TestUnitComponent implements OnInit {

  constructor(private dialog: MatDialog, private nodeMetaApi: NodeMetaService) {
  }

  displayedColumns: string[] = ['Name', 'Alias', 'Version', 'Pversion', 'Vehicle', 'VehicleRelease', 'LastHitDate', 'Ip', 'ProjectAssignment', 'deleteUnit'];
  dataSource_testUnit = new MatTableDataSource<INode>();
  searchControl = new FormControl();

  @ViewChild('nodeMetaPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('nodeMetaSort', { static: true }) sort: MatSort;

  ngOnInit() {

    this.loadNodeList();

    this.searchControl.valueChanges.pipe(
      debounceTime(250)
    ).subscribe((value) => {

      if (value) {
        this.loadNodeList(this.currentFilter, this.currentSort);
      } else {
        this.loadNodeList();
      }

    });

  }

  private async loadNodeList(filter?: any, sort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [nodes, total] = await this.nodeMetaApi.getNodeMetaList(filter, sort, offset, limit).toPromise();

    this.dataSource_testUnit.data = nodes;
    this.paginator.length = total;

  }


  private refresh() {
    this.loadNodeList(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  get currentFilter() {
    if (this.searchControl && this.searchControl.value) {
      return {
        name: this.searchControl.value,
        alias: this.searchControl.value,
        activeProjectName: this.searchControl.value,
        activeProjectVersion: this.searchControl.value,
        vehicle: this.searchControl.value
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

  openProjectAssignmentDialog(node: INode) {
    this.dialog.open(AssignprojectComponent, {
      data: node
    });
  }

  onSortData(event: any) {
    this.refresh();
  }

  onPageNodeChange(event: any) {
    this.refresh();
  }
}
