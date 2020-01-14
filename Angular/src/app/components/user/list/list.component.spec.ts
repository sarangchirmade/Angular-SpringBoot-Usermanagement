import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addUserReducer } from 'src/app/state/action/reducers/user.reducer';
import { TranslateService, TranslatePipe, TranslateStore, TranslateModule, TranslateLoader, TranslateCompiler, TranslateParser } from '@ngx-translate/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { ChangeRoleComponent } from '../change-role/change-role.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from '../user.module';
import { ManagementComponent } from '../management/management.component';
import { MatDialogRef } from '@angular/material';
import { HttpLoaderFactory } from 'src/app/app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
