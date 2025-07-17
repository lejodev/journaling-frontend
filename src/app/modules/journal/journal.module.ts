import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewEntryComponent } from './components/new-entry/new-entry.component';



@NgModule({
  declarations: [
  
    NewEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class JournalModule { }
