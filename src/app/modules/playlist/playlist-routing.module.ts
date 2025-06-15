import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';


const routes: Routes = [
  {
    path: '',
    component: PlaylistListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistRoutingModule {}
