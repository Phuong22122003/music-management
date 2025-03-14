import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './modules/upload/upload.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
