import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) { }

  async login(user: User) {
    const { username, password } = user
    return this.httpService.post("auth/signin", { username, password })
    // return localStorage.getItem("journalUserToken")
  }

  getToken(tokenName: string) {
    return localStorage.getItem(tokenName)
  }

  isLoggedIn(token: string): boolean {
    return this.getToken(token) !== null;
  }

  logOut(token: string): void {
    localStorage.removeItem("journalUserToken");
  }


}
