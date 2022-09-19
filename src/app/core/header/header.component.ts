import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/models/note';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  filteredNotes: Array<Note>;

  ngOnInit(): void {}

  search(event: KeyboardEvent) {
    this.dataService.search((event.target as HTMLInputElement).value);
  }
}
