import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserComponent} from '../../dialog/user-dialog/user-dialog.component';
import {UserService} from '../../../../services/backendApi/user.service';
import {DEFAULT_PAGE_SIZE} from 'src/app/services/shared.service';
import {debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {AUTHORITY, IUser} from '@stibs/api';
import {UserAuthService} from '../../../../services/user_authentification/user-auth.service';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {

  searchControl = new FormControl();

  displayedColumns: string[] = ['forename', 'surname', 'username', 'email', 'department', 'signature', 'authority', 'action-edit', 'action-reset', 'action-delete'];
  dataSource = new MatTableDataSource<IUser>();

  currentUser: IUser;

  AuthAdministrator = AUTHORITY.ADMINISTRATOR;
  AuthTeam = AUTHORITY.TEAM;
  AuthComisioning = AUTHORITY.COMMISSIONING;
  AuthProduction = AUTHORITY.PRODUCTION;

  @ViewChild('resetUserDialogTemplate', {static: true}) resetUserDialogTemplate: TemplateRef<any>;
  @ViewChild('deleteUserDialogTemplate', {static: true}) deleteUserDialogTemplate: TemplateRef<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private userApi: UserService, private userAuthApi: UserAuthService) {
  }

  ngOnInit() {

    this.currentUser = this.userAuthApi.currentUser;
    this.loadUsers();

    this.searchControl.valueChanges.pipe(
      debounceTime(250)
    ).subscribe((value) => {

      if (value) {
        this.loadUsers(this.currentFilter, this.currentSort);
      } else {
        this.loadUsers();
      }

    });

  }

  openAddUserDialog(): void {

    const dialogRef = this.dialog.open(UserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });

  }

  openEditUserDialog(user: IUser): void {

    this.dialog.open(UserComponent, {
      data: user
    });

  }

  openResetUserPassword(user: IUser): void {

    const dialogRef = this.dialog.open(this.resetUserDialogTemplate, {
      data: user
    });

    dialogRef.afterClosed().subscribe((choise) => {
      if (choise) {
        this.userApi.resetPwd(user.username).subscribe();
      }
    });

  }

  openDeleteUserDialog(user: IUser): void {

    const dialogRef = this.dialog.open(this.deleteUserDialogTemplate, {
      data: user
    });

    dialogRef.afterClosed().subscribe((choice) => {
      if (choice) {
        this.userApi.deleteUser(user.id).subscribe(() => {
          this.loadUsers();
        });
      }
    });

  }

  private async loadUsers(filter?: any, sort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [users, total] = await this.userApi.getUserList(filter, sort, offset, limit).toPromise();

    this.dataSource = new MatTableDataSource<any>(users);
    this.paginator.length = total;

  }

  private refresh() {
    this.loadUsers(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  get currentFilter() {
    if (this.searchControl && this.searchControl.value) {
      return {email: this.searchControl.value, username: this.searchControl.value};
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

  onPageUserChange(event: any) {
    this.refresh();
  }

  isCurrentUser(userItem: IUser) {
    return (userItem.id === this.currentUser.id);
  }

  matchRole(user, roleDescr) {
    return (user.authorityName === roleDescr);
  }

}
