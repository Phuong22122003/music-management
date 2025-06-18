import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '../../../../core/models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../../../../core/services/playlist.service';
import { TrackService } from '../../../../core/services/track.service';
import { Track } from '../../../../core/models/track';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-playlist-form',
  standalone: false,
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss'
})
export class PlaylistFormComponent {
  @Input() playlist: Playlist | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() saveSuccess = new EventEmitter<void>();
  activeTab: 'info' | 'tracks' = 'info';

  form: FormGroup;
  imageFile?: File;

  constructor(
    private fb: FormBuilder,
    private playlistService: PlaylistService,
    private trackService: TrackService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['',Validators.maxLength(255)],
    });
  }

  tracks: Track[] = []; // Tất cả bài hát
  selectedTrackIds: number[] = []; // Bài hát được chọn

  ngOnInit(): void {
    if (this.playlist) {
      this.form.patchValue({
        name: this.playlist.name,
        description: this.playlist.description
      });
      this.selectedTrackIds = this.playlist.tracks?.map(t => t.idTrack) || [];
    }

    this.trackService.getTrackList().subscribe(res => {
      this.tracks = res.data;
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Để hiển thị lỗi
      return;
    }

    const formData = new FormData();
    const request = {
      ...this.form.value,
      trackIds: this.selectedTrackIds
    };
    formData.append('playlist', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    const request$ = this.playlist
      ? this.playlistService.updatePlaylist(this.playlist.id, formData)
      : this.playlistService.createPlaylist(formData);

    request$.subscribe({
      next: () => {
        this.toastr.success('Playlist đã được lưu thành công');
        this.saveSuccess.emit();
      },
      error: () => {
        this.toastr.error('Có lỗi xảy ra khi lưu playlist');
      }
    });
  }
  toggleTrack(trackId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.selectedTrackIds.includes(trackId)) {
        this.selectedTrackIds.push(trackId);
      }
    } else {
      this.selectedTrackIds = this.selectedTrackIds.filter(id => id !== trackId);
    }
  }



  onCancel() {
    this.cancel.emit();
  }
}
