import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Store, select, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/state/user.state';
import { ADD_USER, DELETE_USER } from 'src/app/state/action/reducers/user.reducer';
import { MatSort } from '@angular/material/sort';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog, MatPaginator } from '@angular/material';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "firstName",
    "lastName",
    "email",
    "role",
    "action"
  ];

  userDataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);
  userData: Observable<User[]>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private store: Store<UserState>, public dialog: MatDialog, private userService: UserService) {
    this.userData = this.store.select(state => state.user);
    this.userData.subscribe(obj => {
      this.userService.getAllUsers().subscribe(userData => {
        this.userDataSource.data = userData;
      })
    });
  }

  ngOnInit() {
    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.userDataSource.data.forEach(row => this.selection.select(row));
  }

  editRecord(data: User) {
    const dialog = this.dialog.open(AddUserComponent, {
      width: '65%',
      height: '100vh',
      position: {
        right: '0',
      },
      data: {
        userData: data,
        edit: true
      }
    });

    dialog.afterClosed().subscribe(result => {
      this.selection.clear();
    });
  }

  deleteRecord(data: User) {
    this.userService.deleteUser(data.id).subscribe(result => {
      this.store.dispatch({type: DELETE_USER , id: data.id});
      this.selection.clear();
    });

  }
}
