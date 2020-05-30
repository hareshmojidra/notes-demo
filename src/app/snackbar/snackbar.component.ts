import { Component, OnInit } from '@angular/core';
import { GetterSetterService } from '../getter-setter.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  popOverMessage: any[] = [];
  public notesArr: any[] = [];
  deleteNoteArr: any[] = [];

  constructor(public gettersetter: GetterSetterService) { }

  ngOnInit(): void {
    this.popOverMessage = this.gettersetter.getPopover();
    this.notesArr = this.gettersetter.getNotes();
    this.deleteNoteArr = this.gettersetter.getDeletedNote();
  }

  onUndo() {
    let message = this.popOverMessage;
    if (message[0] == "Note added") {
      this.notesArr = this.notesArr.pop();
    }
    if (message[0] == "Note deleted") {
      this.notesArr = this.deleteNoteArr;
      this.gettersetter.setNotes(this.deleteNoteArr[0].noteText, this.deleteNoteArr[0].color);
    }
  }

}
