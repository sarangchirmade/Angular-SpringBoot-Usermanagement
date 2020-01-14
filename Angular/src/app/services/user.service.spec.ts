import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user.model';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientModule],
    providers: [UserService]

  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });


  it('be able to retrieve posts from the API bia GET', () => {
    const service: UserService = TestBed.get(UserService);
    const dummyUsers: User[] = [{
      id: 1,
      firstName: 'sarang',
      lastName: 'chirmade',
      email: 'sarang@gmail.com',
      phone: 123647,
      role: {
        id: 1,
        name: 'admin',
        roleid: 1
      },
      userPassword: '21324324'
    }];
    service.getAllUsers().subscribe(users => {
        expect(users.length).toBe(11);
        expect(users).toEqual(dummyUsers);
    });
});

});


