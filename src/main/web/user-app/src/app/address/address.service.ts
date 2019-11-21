import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SERVER_API_URL} from "../app.constants";
import {Address} from "./address.model";

@Injectable({ providedIn: 'root' })
export class AddressService {
  public resourceUrl = SERVER_API_URL + '/api/addresses';

  constructor(private http: HttpClient) {}

  update(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.resourceUrl}/${address.id}`, address);
  }

  find(id: any): Observable<Address> {
    return this.http.get<Address>(`${this.resourceUrl}/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }
}
