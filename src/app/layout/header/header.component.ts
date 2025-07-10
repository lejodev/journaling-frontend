import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onLClickLogout() {
    // Logic for logout
    try {
      this.authService.logOut()
      this.router.navigate(['/auth/signin'])
    } catch (error) {
      console.log(error);
      
      
    }
    console.log('Logout clicked');
  }

}
