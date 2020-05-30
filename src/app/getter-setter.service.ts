import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetterSetterService {

  setNotesArr: any[] = [];
  editNoteText: any;
  setPopMessage: string[] = [];
  deleteNoteArr: any[] = [];


  constructor() { }

  setNotes(noteText, color) {
    this.setNotesArr.push({ noteText: noteText, color: color });
  }

  getNotes() {
    return this.setNotesArr;
  }

  setPopOver(popMessage) {
    this.setPopMessage = [];
    this.setPopMessage.push(popMessage);
  }

  getPopover() {
    return this.setPopMessage;
  }

  setDeletedNote(noteText, color) {
    this.deleteNoteArr = [];
    this.deleteNoteArr.push({ noteText: noteText, color: color });
  }

  getDeletedNote() {
    return this.deleteNoteArr;
  }
}
