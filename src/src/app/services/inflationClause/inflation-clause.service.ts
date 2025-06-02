import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/config/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InflationClauseService {
  constructor(private http: HttpClient) { }
  getInflationClauseById(id :string): Observable<any> {
    return this.http.get<any>(enviroment.apiUrl+"InflationClause/InflationClauseById/"+id);
  }
}
