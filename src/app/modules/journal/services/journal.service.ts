import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Entry } from '../interfaces/jourl.interface';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from '../../auth/services/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(
    private readonly http: HttpService,
    private readonly jwtService: JwtService
  ) { }

  getEntriesPerUser(userId: string) {
    return this.http.get(`journal/my_journals/${userId}`)
  }

  createJournal(journal: Entry) {

    console.log(journal);
    
    return this.http.post('journal', journal );
  }

}