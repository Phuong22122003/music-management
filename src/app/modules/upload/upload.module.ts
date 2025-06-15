import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';
import { HeaderComponent } from './components/header/header.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditBarComponent } from './components/edit-bar/edit-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UploadFormComponent } from './components/upload-form/upload-form.component';

@NgModule({
  declarations: [
    UploadComponent,
    HeaderComponent,
    TracksComponent,
    EditBarComponent,
    UploadFormComponent,
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UploadModule {}
