import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Entry } from 'src/app/modules/journal/interfaces/jourl.interface';
import { ModalService } from '../../services/modal.service';
import { JournalService } from 'src/app/modules/journal/services/journal.service';

interface DialogData {
  id?: string,
  data: Entry,
  isEditing: Boolean
}

@Component({
  selector: 'app-edit-entry-modal',
  templateUrl: './edit-entry-modal.component.html',
  styleUrls: ['./edit-entry-modal.component.scss']
})
export class EditEntryModalComponent implements OnInit {

  editEntryForm!: FormGroup
  formInitialValue: any

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public modalService: ModalService,
    private journalService: JournalService,
    public dialogRef: MatDialogRef<EditEntryModalComponent>) {
    this.editEntryForm = this.fb.nonNullable.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(this.dialogData.data);

    this.editEntryForm.patchValue({
      title: this.dialogData.data.title,
      content: this.dialogData.data.content
    })
    this.formInitialValue = this.editEntryForm.value;

    this.editEntryForm.valueChanges.subscribe(currentVal => {
      this.getChangedValues(this.formInitialValue, currentVal)

    })
  }

  async onSubmit() {
    let editedEntry = this.editEntryForm.value
    const changedValues = this.getChangedValues(this.formInitialValue, editedEntry)
    console.log('CHENGED VALUE: ', changedValues);

    if (Object.keys(changedValues).length >= 0) {
      console.log('Patch here: ', changedValues);
      let id = this.dialogData.data.id
      console.log('aidí', id);
      
      await this.journalService.patchJournal(changedValues as Partial<Entry>, JSON.stringify(id))

    } else {
      return
    }
    this.dialogRef.close(this.editEntryForm.value)
  }

  getChangedValues(original: any, modified: any): any {
    let changed: any = {}
    for (const item in modified) {
      if (modified.hasOwnProperty(item) && modified[item] !== original[item]) {
        const element = original[item];
        changed[item] = modified[item];
      }
    }
    console.log('changed', changed);

    return changed
  }

}
