import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-card',
  templateUrl: './journal-card.component.html',
  styleUrls: ['./journal-card.component.scss']
})
export class JournalCardComponent implements OnInit {
  @Input() journal!: any
  @Output() delete = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    // Handle click event, e.g., navigate to journal details
    console.log('Journal clicked:', this.journal);
    this.router.navigate(['/my-entries/', this.journal.id]);
  }

  onClickDelete(event: Event) {
    event.stopPropagation();

    // Handle delete event
    console.log('Delete journal:', this.journal);
    this.delete.emit(this.journal);
  }

}
