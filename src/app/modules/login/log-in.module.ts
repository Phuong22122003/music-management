import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { LogInComponent } from './log-in.component';
import { LogInModuleRouting } from './log-in-routing.module';

@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LogInModuleRouting
  ],
})
export class LogInModule {}