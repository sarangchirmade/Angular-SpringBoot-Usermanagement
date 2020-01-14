import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRoleComponent } from './change-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from '../list/list.component';
import { ManagementComponent } from '../management/management.component';
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

describe('ChangeRoleComponent', () => {
  let component: ChangeRoleComponent;
  let fixture: ComponentFixture<ChangeRoleComponent>;

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
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRoleComponent);
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
