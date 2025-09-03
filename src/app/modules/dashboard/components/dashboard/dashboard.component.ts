import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/modules/auth/services/jwt/jwt.service';
import { JournalService } from 'src/app/modules/journal/services/journal.service';
import { Entry } from 'src/app/modules/journal/interfaces/jourl.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  decodedToken: any = null;
  journalList!: Entry[];

  constructor(
    private readonly authService: AuthService,
    private readonly journalService: JournalService,
    private readonly router: Router,
    private readonly jwt: JwtService
  ) { }

  ngOnInit() {
    try {
      const token = this.authService.getToken("journalUserToken");
      if (!token || !this.authService.isLoggedIn("journalUserToken")) {
        this.router.navigate(['/auth/signin']);
        return;
      }
      this.decodedToken = this.jwt.decodeToken(token);

      // 1. Fetch from backend and update the subject
      this.journalService.getEntriesPerUser().subscribe();

      // 2. Subscribe to the subject for reactive updates
      this.journalService.entries$.subscribe(entries => {
        this.journalList = entries;
      });

    } catch (error) {
      console.error('Error in DashboardComponent ngOnInit:', error);
      this.router.navigate(['/auth/signin']);
    }
  }


  onDeleteJournal(journal: Entry) {
    console.log('JOURNAL DELETION TRIGGERED FROM CARD', journal)

    if (journal.id) {

      this.journalService.deleteEntry(journal.id).subscribe({
        next: (res) => {
          console.log(res);
          const updatedEntries = this.journalList.filter(entry => entry.id !== journal.id)
          this.journalService.setEntries(updatedEntries);

          console.log(updatedEntries);
          

        },
        error: (err) => {
          console.log(err);
          
        }


      })
    } else {
      console.error('Journal ID is undefined. Cannot delete journal entry.');
    }
  }
}