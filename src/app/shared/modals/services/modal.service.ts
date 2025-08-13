import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Entry } from 'src/app/modules/journal/interfaces/jourl.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _dialog = inject(MatDialog);

  constructor() { }

  openModal<CT, T = Entry>(componentRef: ComponentType<CT>, data?: T, isEditing = false): MatDialogRef<any> {

    const config = { data, isEditing };

    return this._dialog.open(componentRef, {
      data: config,
      'width': '600px'
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }

}
