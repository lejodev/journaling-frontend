import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Entry } from '../interfaces/jourl.interface';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from '../../auth/services/jwt/jwt.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private entriesSubject = new BehaviorSubject<Entry[]>([]) // This gives the next() method to the entries list
  entries$ = this.entriesSubject.asObservable(); // THis is the observable components will be subscribed to. When something happens, the components will "react" to that change

  constructor(
    private readonly http: HttpService,
    private readonly jwtService: JwtService
  ) { }

  getEntriesPerUser() {
    return this.http.get('journal/my_journals').pipe(tap(res => {
      const entries = Array.isArray(res) ? res as Entry[] : [res as Entry];
      this.entriesSubject.next(entries);
    }))
  }

  getEntryById(id: string) {
    return this.http.get(`journal/my_journal/${id}`);
  }

  setEntries(entries: Entry[]) {
    this.entriesSubject.next(entries);
  }

  createJournal(journal: Entry) {
    return this.http.post('journal', journal);
  }

  getMyJournals() {
    return this.http.get('journal/my_journals');
  }

  patchJournal(partialJournal: Partial<Entry>, id: string) {
    console.log('patching journal', partialJournal);
    return this.http.patch(`journal/${id}`, partialJournal).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }

  deleteEntry(id: string) {
    return this.http.delete(`journal/${id}`);
  }

}