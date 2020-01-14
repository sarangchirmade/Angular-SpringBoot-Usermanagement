import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADD_USER, DELETE_USER } from 'src/app/state/action/reducers/user.reducer';
import { User, Role } from 'src/app/models/user.model';
import { UserState } from 'src/app/state/user.state';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  editForm = false;
  userData: User;
  roleList: Role[];

  constructor(
    private store: Store<UserState>,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if( data != null) {
      this.userData = data.userData;
      this.editForm = data.edit;
    }
  }

  ngOnInit() {



    this.userService.getAllRoles().subscribe(obj => {
      this.roleList = obj;
    });
    this.addUserForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required]],
      role: ["", Validators.required]
    });
  }
  ngAfterViewInit() {
    if (this.editForm && this.userData != null) {
        this.addUserForm.controls["firstName"].setValue(this.userData.firstName);
        this.addUserForm.controls["email"].setValue(this.userData.email);
        this.addUserForm.controls["lastName"].setValue(this.userData.lastName);
        this.addUserForm.controls["password"].setValue (this.userData.userPassword);
        this.addUserForm.controls["phone"].setValue(this.userData.phone);
        this.addUserForm.controls["role"].setValue(this.userData.role);
    }
  }
  addCustomer() {
    this.addUserForm.markAllAsTouched();
    if (this.editForm && this.userData != null) {
      this.store.dispatch({type: DELETE_USER , id: this.userData.id});
    }

    if (!this.addUserForm.invalid) {
      const newUserObj =  <User>{
        id: this.editForm ?  this.userData.id : '',
        firstName: this.addUserForm.controls["firstName"].value,
        lastName: this.addUserForm.controls["lastName"].value,
        email: this.addUserForm.controls["email"].value,
        userPassword: this.addUserForm.controls["password"].value,
        phone: this.addUserForm.controls["phone"].value,
        role: this.addUserForm.controls["role"].value
      }

      if (!this.editForm) {
        this.userService.addUser(newUserObj).subscribe(updatedObj => {
          this.store.dispatch({ type: ADD_USER, payload: updatedObj});
        });
      } else {
        this.userService.updateUser(newUserObj).subscribe(updatedObj => {
          this.store.dispatch({ type: ADD_USER, payload: updatedObj});
        });
      }

      this.dialogRef.close();
    }
  }

  submit() {}
}
