import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { User, Role } from "src/app/models/user.model";
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent,
  MatDialog
} from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { map, startWith } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { UserState } from "src/app/state/user.state";
import { UserService } from "src/app/services/user.service";
import {
  DELETE_USER,
  ADD_USER
} from "src/app/state/action/reducers/user.reducer";

@Component({
  selector: "app-change-role",
  templateUrl: "./change-role.component.html",
  styleUrls: ["./change-role.component.scss"]
})
export class ChangeRoleComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  changeUserRoleForm: FormGroup;

  userCtrl = new FormControl();
  roleCtrl = new FormControl();
  filterUserList: Observable<User[]>;
  users: User[] = [];
  allUsers: User[] = [];
  roleList: Role[];

  @ViewChild("userInput", { static: false }) userInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;
  constructor(
    private store: Store<UserState>,
    public dialog: MatDialog,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userService.getAllUsers().subscribe(obj => {
      this.allUsers = obj;
    });

    this.userService.getAllRoles().subscribe(obj => {
      this.roleList = obj;
    });
  }

  ngOnInit() {
    this.changeUserRoleForm = this.formBuilder.group({
      userName: ["", Validators.required],
      role: ["", Validators.required]
    });
    this.filterUserList = this.changeUserRoleForm
    .get("userName")
    .valueChanges.pipe(
      startWith(null),
      map((user: string | null) =>
        user ? this._filter(user) : this.allUsers.slice()
      )
    );
  }
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        this.allUsers.filter(user => {
          if (user.firstName.toLowerCase().indexOf(value) === 0) {
            this.users.push(user);
            return true;
          }
        });
      }

      if (input) {
        input.value = "";
      }

      this.userCtrl.setValue(null);
    }
  }

  remove(user: User): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.userInput.nativeElement.value = "";
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(
      user => user.firstName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  changeUserRole() {
    let selectedRole = this.changeUserRoleForm.get("role").value;
    this.users.forEach(userObj => {
      userObj["role"] = selectedRole;
      this.userService.updateUser(userObj).subscribe(userObj => {
        this.store.dispatch({ type: ADD_USER, payload: userObj });
      });
    });

    this.dialog.closeAll();
  }
}
