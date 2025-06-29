import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/modules/auth/services/jwt/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  decodedToken: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwt: JwtService
  ) { }

  ngOnInit() {
    try {
      const token = this.authService.getToken("journalUserToken");
      if (!token || !this.authService.isLoggedIn("journalUserToken")) {
        this.router.navigate(['/auth/signin']);
        return;
      }
      this.decodedToken = this.jwt.decodeToken(token);
      console.log('Token:', token, 'Decoded:', this.decodedToken);
    } catch (error) {
      console.error('Error in DashboardComponent ngOnInit:', error);
      this.router.navigate(['/auth/signin']);
    }
  }
}
