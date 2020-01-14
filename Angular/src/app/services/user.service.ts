import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user.model';
import { Observable } from 'rxjs';
import { GlobalConstant, GlobalFunction } from '../common/utils.common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient) { }

  getAllUsers():Observable<User[]> {
    return this.httpClient.get<User[]>(GlobalConstant.USER_URL);
  }

  addUser(userObj: User):Observable<User[]> {
    return this.httpClient.post<User[]>(GlobalConstant.USER_URL, userObj, GlobalFunction.getHeader());
  }

  updateUser(userObj: User):Observable<User[]> {
    return this.httpClient.put<User[]>(GlobalConstant.USER_URL, userObj, GlobalFunction.getHeader());
  }

  deleteUser(userId: number): Observable<Object> {
    const deleteURL = `${GlobalConstant.USER_URL}/${userId}`;
    return this.httpClient.delete<Object>(deleteURL);
  }

  getAllRoles():Observable<Role[]> {
    return this.httpClient.get<Role[]>(GlobalConstant.ROLE_URL);
  }


}
