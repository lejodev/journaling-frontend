import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { JournalCardComponent } from './components/journal-card/journal-card.component';



@NgModule({
  declarations: [
    NewEntryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class JournalModule { }
