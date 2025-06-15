import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaylistRoutingModule } from './playlist-routing.module';



@NgModule({
  declarations: [
    PlaylistListComponent,
    PlaylistFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlaylistRoutingModule
  ]
})
export class PlaylistModule { }
