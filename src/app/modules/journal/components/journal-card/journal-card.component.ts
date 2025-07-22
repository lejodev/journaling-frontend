import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-journal-card',
  templateUrl: './journal-card.component.html',
  styleUrls: ['./journal-card.component.scss']
})
export class JournalCardComponent implements OnInit {
  @Input() journal!: any

  constructor() { }

  ngOnInit(): void {
  }

}
