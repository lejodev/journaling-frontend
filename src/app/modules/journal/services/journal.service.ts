import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private readonly http: HttpService) { }

  getEntriesPerUser(userId: string) {
    return this.http.get(`journal/my_journals/${userId}`)
  }

}