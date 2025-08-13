import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entry } from 'src/app/modules/journal/interfaces/jourl.interface';
import { JournalService } from 'src/app/modules/journal/services/journal.service';
import { MatDialog } from '@angular/material/dialog';
import { EditEntryModalComponent } from 'src/app/shared/modals/components/edit-entry-modal/edit-entry-modal.component';
import { ModalService } from 'src/app/shared/modals/services/modal.service';

@Component({
  selector: 'app-journal-detail',
  templateUrl: './journal-detail.component.html',
  styleUrls: ['./journal-detail.component.scss']
})
export class JournalDetailComponent implements OnInit {

  routeSub!: Subscription;
  entry!: Entry | any;

  private _modal = inject(ModalService)

  constructor(
    private route: ActivatedRoute,
    private journalService: JournalService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.journalService.getEntryById(id).subscribe({
          next: (journal) => {
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

  editEntry() {
    console.log(this.entry);

    const dialogRef = this._modal.openModal<EditEntryModalComponent>(EditEntryModalComponent, this.entry);

    dialogRef.afterClosed().subscribe({
      next: (updatedEntry) => {

        if (updatedEntry) {
          this.entry = updatedEntry
        } else {
          console.log('Not updated data!');
        }

        // *** This approach is better for larger ObjectUnsubscribedError, but in this case it is better to assign the updatedEntryult directly to the this.entry variable ***

        // let currentEntry = this.entry;
        // console.log('CURRENT', this.entry);

        // for (const key in currentEntry) {
        //   console.log('key', currentEntry[key]);

        //   if (currentEntry.hasOwnProperty(key) && updatedEntry.hasOwnProperty(key)) {
        //     const element = currentEntry[key];
        //     console.log('Yeah, it has: ', key, ' with value: ', element);
        //     currentEntry[key] = updatedEntry[key]
        //   }
        // }
        // this.entry = currentEntry
        // console.log('UPDATED', this.entry);
      },
      error: (err) => {
        console.log(err);

      }
    })


  }

}
