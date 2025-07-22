import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JournalCardComponent } from '../journal/components/journal-card/journal-card.component';



@NgModule({
  declarations: [
    DashboardComponent,
    JournalCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
