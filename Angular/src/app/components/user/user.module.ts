import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule} from 'src/app/material/material.module';
import { ManagementComponent } from './management/management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeRoleComponent } from './change-role/change-role.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: ManagementComponent
  }
]


@NgModule({
  declarations: [ListComponent, ManagementComponent, AddUserComponent, ChangeRoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddUserComponent,
    ChangeRoleComponent
  ]
})
export class UserModule { }
