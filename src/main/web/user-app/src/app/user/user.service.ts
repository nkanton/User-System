import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SERVER_API_URL} from "../app.constants";
import {User} from "./user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + '/api/users';

  constructor(private http: HttpClient) {}

  create(user: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.resourceUrl}/${user.id}`, user);
  }

  find(id: any): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`);
  }

  query(user: User): Observable<HttpResponse<User[]>> {
    const params = UserService.createParams(user);
    return this.http.get<User[]>(this.resourceUrl + "/search", { params: params, observe: 'response' });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  private static createParams(user: User) : HttpParams {
    let options: HttpParams = new HttpParams();
    if (user) {
      options.set("userName",user.userName);
      options.set("firsName",user.firstName);
      options.set("lastName",user.lastName);
      options.set("phoneNumber",user.phoneNumber);
      options.set("email",user.email);
    }
    return options;
  }
}
