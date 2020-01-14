import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { ChangeRoleComponent } from '../change-role/change-role.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  addUser(): void {
    const dialog = this.dialog.open(AddUserComponent, {
      width: '65%',
      height: '100vh',
      position: {
        right: '0',
      },
      data: {}
    });
  }


  changeUserRole(): void {
    const dialog = this.dialog.open(ChangeRoleComponent, {
      width: '50%',
      height: '100vh',
      position: {
        right: '0',
      },
      data: {}
    });
  }
}
