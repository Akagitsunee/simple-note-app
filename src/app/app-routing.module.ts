import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteOverviewComponent } from './components/note-overview/note-overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: NoteOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
