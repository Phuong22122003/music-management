import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreComponent } from './genre.component';
import { GenreFormComponent } from './components/genre-form/genre-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GenreComponent, GenreFormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GenreRoutingModule
  ]
})
export class GenreModule {}
