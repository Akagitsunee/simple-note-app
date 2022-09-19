import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Note } from 'src/app/shared/models/note';
import { DataService } from 'src/app/shared/services/data.service';
import { stringify } from 'uuid';

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss'],
})
export class NoteOverviewComponent implements OnInit {
  @ViewChild('notecontent') notecontent: ElementRef;

  modalRef: NgbModalRef;
  titleFocused = false;
  bodyFocused = false;
  bodyShown = false;
  showDetails = false;
  title = '';
  content = '';
  currentNote: Note;
  currentNotes: Array<Note>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.currentNodes.subscribe(
      (data) => (this.currentNotes = data)
    );
  }

  changeTitleFocusStatus(event: FocusEvent) {
    this.titleFocused = !this.titleFocused;
    if (this.titleFocused && !this.bodyShown) {
      this.showBody();
    } else if (this.checkHideParameters() && !this.checkRelation(event)) {
      this.bodyShown = !this.bodyShown;
    }
  }

  changeBodyFocusStatus(event: FocusEvent) {
    this.bodyFocused = !this.bodyFocused;
    if (this.checkHideParameters() && !this.checkRelation(event)) {
      this.bodyShown = !this.bodyShown;
    }
  }

  checkHideParameters(): boolean {
    return (
      !this.bodyFocused &&
      !this.titleFocused &&
      this.bodyShown &&
      this.content.length === 0 &&
      this.title.length === 0
    );
  }

  checkRelation(event: FocusEvent): boolean {
    var source: Node = <Node>event.currentTarget;
    var parentSource = source?.parentElement?.parentElement;
    var target: Node = <Node>event.relatedTarget;
    var targetSource = target?.parentElement?.parentElement;

    return parentSource === targetSource;
  }

  showBody() {
    this.bodyShown = !this.bodyShown;
    this.changeDetector.detectChanges();
    this.notecontent.nativeElement.focus();
  }

  reset() {
    this.title = '';
    this.content = '';
    this.bodyShown = false;
    this.bodyFocused = false;
    this.titleFocused = false;
  }

  save() {
    var note = new Note(this.title, this.content);
    this.dataService.createNote(note);
    this.reset();
  }

  delete(note: Note) {
    this.dataService.deleteNode(note);
  }

  openEditDialog(note: Note) {
    this.currentNote = note;
    this.isOpenEdit();
  }

  isOpenEdit() {
    this.showDetails = !this.showDetails;
    this.changeDetector.detectChanges();
  }
}
