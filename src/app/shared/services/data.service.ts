import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    this.getLocalStorage();
  }

  private _notes: Array<Note> = this.getLocalStorage();
  private _currentNotes = new BehaviorSubject<Array<Note>>(this._notes);

  get currentNodes() {
    return this._currentNotes;
  }

  get notes() {
    return this._notes;
  }

  public createNote(note: Note) {
    this._notes.push(note);
    this.save();
  }

  public changeNote(updatedNote: Note) {
    let note: Note = this._notes.find((note) => note.id === updatedNote.id)!;
    let index = this._notes.indexOf(note);
    this._notes[index] = updatedNote;

    this.save();
  }

  private save() {
    localStorage.setItem('notes', JSON.stringify(this._notes));
  }

  private getLocalStorage() {
    return JSON.parse(localStorage.getItem('notes') || '[]');
  }

  public deleteNode(note: Note): void {
    let index = this._notes.indexOf(note);
    this._notes.splice(index, 1);
    this.save();
  }

  public search(s: string) {
    if (s.length >= 2) {
      this._currentNotes.next(
        this.notes.filter(
          (note) =>
            note.content.toLowerCase().includes(s.toLowerCase()) ||
            note.title.toLowerCase().includes(s.toLowerCase())
        )
      );
    } else {
      this._currentNotes.next(this._notes);
    }
  }
}
