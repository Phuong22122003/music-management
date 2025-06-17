import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [AudioPlayerComponent, ConfirmDialogComponent],
  imports: [CommonModule, FormsModule],
  exports: [AudioPlayerComponent, CommonModule, ConfirmDialogComponent],
})
export class SharedModule {}
