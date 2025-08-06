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
      console.log('IINN');
      
      const token = this.authService.getToken("journalUserToken");
      if (!token || !this.authService.isLoggedIn("journalUserToken")) {
        this.router.navigate(['/auth/signin']);
        return;
      }
      this.decodedToken = this.jwt.decodeToken(token);
      console.log(this.decodedToken);
      
      console.log('Token:', token, 'Decoded:', this.decodedToken.id);

      this.journalService.getEntriesPerUser().subscribe((res: unknown) => {
        this.journalList = res as Entry[];
        console.log("RES", res);
      })

    } catch (error) {
      console.error('Error in DashboardComponent ngOnInit:', error);
      this.router.navigate(['/auth/signin']);
    }
  }
}
