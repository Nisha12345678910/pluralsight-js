import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/config/enviroment';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }
  getSchedules(): Observable<Blob> {
    return this.http.get<Blob>(enviroment.apiUrl+"Schedule/DownloadAllSchedule",{ responseType: 'blob' as 'json' });
  }
  getScheduleDropDown(): Observable<any> {
    return this.http.get<any>(enviroment.apiUrl+"Schedule/ScheduleDropDown");
  }
}
