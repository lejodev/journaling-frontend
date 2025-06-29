import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpService) { }

  getEntrPerUser(userId: string) 

}