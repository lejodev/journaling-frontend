import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JournalService } from '../../services/journal.service';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { JwtService } from 'src/app/modules/auth/services/jwt/jwt.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  newEntryForm!: FormGroup;
  decodedToken!: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly journalService: JournalService,
    private readonly authService: AuthService,
    private readonly jwt: JwtService
  ) { }

  ngOnInit(): void {

    this.newEntryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      content: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  saveEntry(): void {
    const token = this.authService.getToken("journalUserToken");
    this.decodedToken = this.jwt.decodeToken(token as string);
    console.log(this.decodedToken);
    
    // console.log(this.newEntryForm.value);
    // this.journalService.createJournal(this.newEntryForm.value).subscribe({
    //   next: (response) => {
    //     console.log("Journal entry created successfully", response);
    //     this.newEntryForm.reset();
    //   }
    //   , error: (error) => {
    //     console.error("Error creating journal entry", error);
    //   }
    // });
  }

  cancelEntry() {
    console.log('CANCEL');

  }


}
