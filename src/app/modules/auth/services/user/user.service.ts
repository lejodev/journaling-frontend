import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  create(user: User): Observable<User> {
    return this.httpService.post("/auth/signup", user)
  }

  login(user: User): Observable<User> {
    
    const {username, password} = user
    return this.httpService.post("auth/signin", {username, password})
  }
}
