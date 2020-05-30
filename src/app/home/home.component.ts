import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverlayComponent } from '../overlay/overlay.component';
import { GetterSetterService } from '../getter-setter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

export interface Colors {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface sidecolors {
  color: string;
  text: string;
}

export interface DialogData {
  noteText: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  public notesArr: any[] = [];
  selectColor: boolean = false;
  createNote: boolean = false;
  matchedNotes : boolean = false;
  filter : boolean = false;
  filterColor: string;
  value: string;
  backgrondColor: any;
  message: string = "Note added";
  action: any = "undo";
  durationInSeconds = 3;
  public matchedArry: any[] = [];

  sidecolors: any[] = [
    { color: 'White', text: 'show all' },
    { color: 'lightblue', text: 'select' },
    { color: 'lightgreen', text: 'select' },
    { color: 'lightpink', text: 'select' },
    { color: '#DDBDF1', text: 'select' }
  ];
  colors: Colors[] = [
    { text: '', cols: 1, rows: 1, color: 'lightblue' },
    { text: '', cols: 1, rows: 1, color: 'lightgreen' },
    { text: '', cols: 1, rows: 1, color: 'lightpink' },
    { text: '', cols: 1, rows: 1, color: '#DDBDF1' },
  ];

  myDate: any = new Date();
  constructor(private datePipe: DatePipe,
    public dialog: MatDialog,
    public gettersetter: GetterSetterService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.notesArr = this.gettersetter.getNotes();
  }

  matchedColorNotes(color) {
    this.selectColor = false;
    this.filterColor = color;
    this.matchedArry = [];
    this.createNote = false;
    this.matchedNotes = true;
    if (color == "White") {
      this.matchedArry = this.notesArr;
      this.filter = false;
    } else {
      this.notesArr.forEach(element => {
        if (element.color == color) {
          this.filter = true;
          this.matchedArry.push(element);
        }
      });
    }
  }

  onChange() {
    this.selectColor = true;
  }

  saveText(color) {
    this.selectColor = false;
    if (this.filter == true) {
      this.matchedArry = [];
      this.gettersetter.setNotes(this.value, color);
      let notesArray = this.gettersetter.getNotes();
      notesArray.forEach(element => {
        if (element.color == this.filterColor) {
          this.matchedArry.push(element);
        }
      });
      this.value = null;
    }
    else{
    
    this.matchedNotes = false;
    if(this.value == null || this.value == ''){
      return
    }
    this.gettersetter.setNotes(this.value, color);
    this.createNote = true;
    this.value = null;
   
  }
  this.myDate = this.datePipe.transform(this.myDate, 'MMMM d, y');
  this.openSnackBar();
  }

  openDialog(noteText) {
    const dialogRef = this.dialog.open(OverlayComponent, {
      width: '250px',
      data: { noteText: noteText }
    });
  }


  openSnackBar() {
    this.gettersetter.setPopOver(this.message);
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}