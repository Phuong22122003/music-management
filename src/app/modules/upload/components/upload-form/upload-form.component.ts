import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackService } from '../../../../core/services/track.service';
import { Genre } from '../../../../core/models/model';
import { GenreService } from '../../../../core/services/genre.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  standalone: false,
})
export class UploadFormComponent implements OnInit {
  @Output() uploadSuccess = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  uploadForm: FormGroup;
  genres: Genre[] = [];
  musicFile: File | null = null;
  coverFile: File | null = null;
  isValidMusicFile: boolean = true;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private trackService: TrackService,
    private genreService: GenreService,
    private toastService: ToastService
  ) {
    this.uploadForm = this.fb.group({
      name: ['', [Validators.required]],
      mainArtist: ['', [Validators.required]],
      description: [''],
      genreId: [null],
      musicFile: [null, [Validators.required]],
      coverFile: [null],
    });
  }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(
      (data) => {
        this.genres = data.data;
      },
      (error) => {
        console.error('Error loading genres:', error);
      }
    );
  }

  onFileChange(event: any, type: 'audio' | 'image'): void {
    const file = event.target.files[0];
    if (file) {
      if (type === 'audio') {
        this.musicFile = file;
        this.isValidMusicFile = this.validateMusicFile(file);
        this.uploadForm.patchValue({ musicFile: file });
        if (!this.isValidMusicFile) {
          this.uploadForm.get('musicFile')?.setErrors({ invalidType: true });
        }
      } else {
        this.coverFile = file;
        this.uploadForm.patchValue({ coverFile: file });
      }
    }
  }

  validateMusicFile(file: File): boolean {
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg'];
    return validTypes.includes(file.type);
  }

  submit(): void {
    this.formSubmitted = true;
    this.markFormGroupTouched(this.uploadForm);
    if (this.uploadForm.valid && this.musicFile && this.isValidMusicFile) {
      const formData = new FormData();
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('mainArtist', this.uploadForm.get('mainArtist')?.value);
      formData.append('description', this.uploadForm.get('description')?.value);
      if (this.uploadForm.get('genreId')?.value) {
        formData.append('genreId', this.uploadForm.get('genreId')?.value);
      }
      formData.append('file', this.musicFile);
      if (this.coverFile) {
        formData.append('image', this.coverFile);
      }

      this.trackService.uploadTrack(formData).subscribe(
        () => {
          this.uploadSuccess.emit();
          this.toastService.toastSuccess.next({
            message: 'Upload track successfully!',
            summary: 'Success',
          });
          this.resetForm();
        },
        (error) => {
          console.error('Error uploading track:', error);
        }
      );
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForm(): void {
    this.uploadForm.reset();
    this.musicFile = null;
    this.coverFile = null;
    this.isValidMusicFile = true;
    this.formSubmitted = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
