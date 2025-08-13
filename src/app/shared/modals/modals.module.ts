import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEntryModalComponent } from './components/edit-entry-modal/edit-entry-modal.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    EditEntryModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModalsModule { }
