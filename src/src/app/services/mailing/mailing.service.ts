import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';
import { enviroment } from 'src/config/enviroment';
@Injectable({
  providedIn: 'root'
})
export class MailingService {
  constructor(private http: HttpClient) { }
  getMailingById(id :string): Observable<any> {
    return this.http.get<any>(enviroment.apiUrl+"Mailing/MailingById/"+id);
  }
}
