import { Component, OnInit, Inject } from '@angular/core';
import { GetterSetterService } from '../getter-setter.service';
import { HomeComponent, DialogData } from '../home/home.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

export interface Colors {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  notesList: any[] = [];
  deleteNoteArr: string[] = [];
  editNoteText: any;
  value: any;
  createNote: boolean = false;
  messageDelete: string = "Note deleted";
  messageAdd: string = "Note added";
  acton: any = "undo";
  durationInSeconds: any = 3;

  colors: Colors[] = [
    {text: '', cols: 1, rows: 1, color: 'lightblue'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    public gettersetter: GetterSetterService,
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.value = this.data.noteText;
    this.notesList = this.gettersetter.getNotes();
  }

  deleteNote(){
    this.notesList.forEach(element => {
      if(this.data.noteText == element.noteText){
        const index = this.notesList.indexOf(element);
        console.log(index)
        if (index > -1) {
          this.deleteNoteArr = this.notesList[index];
          this.gettersetter.setDeletedNote(this.notesList[index].noteText, this.notesList[index].color)
          this.notesList.splice(index, 1);
          console.log(this.deleteNoteArr)
        }
      }
    });
    this.dialogRef.close();
    this.openSnackBarDelete();
  }

  saveText(color){
    this.notesList.forEach(element => {
      if(this.data.noteText == element.noteText){
        // this.notesArr.(element);
        const index = this.notesList.indexOf(element);
        console.log(index)
        if (index > -1) {
          element.noteText =  this.value;
          element.color = color;
        }
      }
    });
    this.createNote = true;
    this.value = null;
    this.dialogRef.close();
    this.openSnackBarAdd();

  }

  openSnackBarDelete() {
    this.gettersetter.setPopOver(this.messageDelete);
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openSnackBarAdd() {
    this.gettersetter.setPopOver(this.messageAdd);
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
