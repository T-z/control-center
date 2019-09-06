import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {CommentService} from '../../../../services/backendApi/comment.service';
import {DEFAULT_PAGE_SIZE} from 'src/app/services/shared.service';
import {debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {IComment} from '@stibs/api';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  searchControl = new FormControl();

  displayedColumns: string[] = ['date', 'category', 'project', 'vehicle', 'testcase', 'comment' ];
  dataSource = new MatTableDataSource<IComment>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private projectApi: ProjectService, private commentApi: CommentService) {
  }

  ngOnInit() {

    this.loadComments();

    this.searchControl.valueChanges.pipe(
      debounceTime(250)
    ).subscribe((value) => {
      if (value) {
        this.loadComments(this.currentFilter, this.currentSort);
      } else {
        this.loadComments();
      }

    });

  }

  async loadComments(filter?: any, sort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [jobs, total] = await this.commentApi.getCommentList(filter, sort, offset, limit).toPromise();
    this.dataSource = new MatTableDataSource<any>(jobs);
    this.paginator.length = total;

  }

  private refresh() {
    this.loadComments(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  get currentFilter() {
    if (this.searchControl && this.searchControl.value) {
      return {category: this.searchControl.value, comment: this.searchControl.value, testCase: this.searchControl.value,
      vehicleName: this.searchControl.value, projectName: this.searchControl.value};
  }
  }

  get currentSort() {
    if (this.sort && this.sort.active && this.sort.direction) {
      return {
        [this.sort.active]: this.sort.direction.toUpperCase()
      };
    }
  }

  onSortData(event: any) {
    this.refresh();
  }

  onPageCommentChange(event: any) {
    this.refresh();
  }

}
