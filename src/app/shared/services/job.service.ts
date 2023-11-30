import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { IJobCard } from '../interfaces/job-card.interface';
import { API_URLS } from 'src/app/common/routes-config';
@Injectable({
  providedIn: 'root'
})
export class JobListService {

  constructor(private http: HttpClient) {}
  /**
   * getToDoList
   */
  public getJobList(): Observable<any>{
    return this.http.get(API_URLS.CARDLIST).pipe(map((response) => response));

  }
  /**
   * createToDoList
   */
  public createJobInList(payload: IJobCard): Observable<any>{
    return this.http.post(API_URLS.CARDLIST, JSON.stringify(payload)).pipe(map((response) => response))

  }
  /**
   * deleteToDoList
   */
  public deleteJobInList(id:any): Observable<any>{
    return this.http.delete(API_URLS.CARDLIST_ID.replace('ID', String(id))).pipe(map((response) => response));

  }
}
