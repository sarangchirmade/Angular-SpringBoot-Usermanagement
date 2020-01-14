import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponent } from './management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { userRoutes } from '../user.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { addUserReducer } from 'src/app/state/action/reducers/user.reducer';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeRoleComponent } from '../change-role/change-role.component';
describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        ManagementComponent,
        AddUserComponent,
        ChangeRoleComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule.forChild(userRoutes),
        StoreModule.forRoot({ user: addUserReducer }),
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
