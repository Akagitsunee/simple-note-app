import { Location } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  @ViewChild('dialog') dialog: ElementRef;
  @Input() public note: Note;
  @Output() closeEvent = new EventEmitter<boolean>();

  id: string | null;
  title = '';
  content = '';

  constructor(private dataService: DataService, private location: Location) {}

  ngOnInit(): void {
    this.title = this.note.title;
    this.content = this.note.content;
  }

  save() {
    this.note.title = this.title;
    this.note.content = this.content;

    this.dataService.changeNote(this.note);
    this.close();
  }

  close() {
    this.closeEvent.emit();
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.dialog.nativeElement.contains(event.target)) {
      this.close();
    }
  }
}
