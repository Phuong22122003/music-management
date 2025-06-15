import { Component, ViewChild } from '@angular/core';
import { TracksComponent } from './components/tracks/tracks.component';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  
  @ViewChild(TracksComponent) tracksComponent!: TracksComponent;
  showForm = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  handleUploadSuccess() {
    this.showForm = false;
    this.tracksComponent.fetchTrack();
  }
}
