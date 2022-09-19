import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoteOverviewComponent } from './components/note-overview/note-overview.component';
import { FormsModule } from '@angular/forms';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteOverviewComponent,
    NoteDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  entryComponents: [NoteDetailComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
