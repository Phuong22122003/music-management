import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './modules/upload/upload.component';


const routes: Routes = [
  // Trang login
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/log-in.module').then((m) => m.LogInModule),
  },

  // Các trang chính sau đăng nhập
  {
    path: 'tracks',
    loadChildren: () =>
      import('./modules/upload/upload.module').then((m) => m.UploadModule),
    // canActivate: [AuthGuard] // nếu bạn có guard
  },
  {
    path: 'genres',
    loadChildren: () =>
      import('./modules/genre/genre.module').then((m) => m.GenreModule),
  },
  {
    path: 'playlists',
    loadChildren: () =>
      import('./modules/playlist/playlist.module').then((m) => m.PlaylistModule),
  },

  // fallback: không tìm thấy
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
