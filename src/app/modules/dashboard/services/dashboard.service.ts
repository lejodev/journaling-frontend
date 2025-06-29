import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { HttpService } from 'src/app/core/http/http.service';
import { JwtService } from '../../auth/services/jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpService,
    private jwtService : JwtService
  ) { }

  getJournals()
  {
    // return this.httpService.get
  }

}
