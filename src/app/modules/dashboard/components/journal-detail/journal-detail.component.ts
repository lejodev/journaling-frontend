import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entry } from 'src/app/modules/journal/interfaces/jourl.interface';
import { JournalService } from 'src/app/modules/journal/services/journal.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent implements OnInit {

  routeSub!: Subscription;
  entry!: Entry | any;

  constructor(private route:ActivatedRoute,  private journalService: JournalService) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id) {
        this.journalService.getEntryById(id).subscribe({
          next:(journal) => {
            console.log(journal);
            this.entry = journal
            
          }, error: (err) => {
            console.log(err);
            
          }
        })

      } else {
        console.error('Journal ID not found in route parameters');

      }
      
    })

    
  }

}
