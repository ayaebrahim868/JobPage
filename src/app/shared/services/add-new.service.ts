import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IJobCard } from '../interfaces/job-card.interface';
import { API_URLS } from 'src/app/common/routes-config';
@Injectable({
  providedIn: 'root'
})
export class AddNewService {

  constructor(private http: HttpClient) {}
  /**
   * getToDoList
   */
  public getCountryList(): Observable<any>{
    return this.http.get(API_URLS.COUNTRY).pipe(map((response) => response));

  }
  /**
   * getSectorList
   */
  public getSectorList(): Observable<any>{
    return this.http.get(API_URLS.SECTOR).pipe(map((response) => response));

  }
}
