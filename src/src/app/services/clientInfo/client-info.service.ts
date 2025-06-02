import { Injectable } from '@angular/core';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/config/enviroment';
import { IPagination } from 'src/interface/IPagination';
@Injectable({
  providedIn: 'root'
})
export class ClientInfoService { 
  constructor(private http: HttpClient) { }

  getClientInfoWithOtherDetails(id:number): Observable<any> {
    return this.http.get<any>(enviroment.apiUrl+"ClientInfo/ClientWithOtherDetails/"+id);
  }
  getClientInfos(page:IPagination): Observable<any> {
 
    return this.http.post<any>(enviroment.apiUrl+"ClientInfo/Clients",page);
  }
  getClientDropDown(): Observable<any> {
    return this.http.get<any>(enviroment.apiUrl+"ClientInfo/ClientDropDown");
  }
  saveClientData(id:number,data: any):Observable<any>  {
    return this.http.put<any>(enviroment.apiUrl+"ClientInfo/Client/"+id,data);
  }
  createClientData(data: any):Observable<any>  {
    console.log(data);
    return this.http.post<any>(enviroment.apiUrl+"ClientInfo/Client",data);
  }

}
