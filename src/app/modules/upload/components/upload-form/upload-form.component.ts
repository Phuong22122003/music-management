  import { Component, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { TrackService } from '../../../../core/services/track.service';
import { Genre } from '../../../../core/models/model';
import { GenreService } from '../../../../core/services/genre.service';

  @Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.scss'],
    standalone:false
  })
  export class UploadFormComponent {
    uploadForm: FormGroup;
    audioFile: File | null = null;
    imageFile: File | null = null;
    genres: Genre[] = [];
    

    @Output() uploadSuccess = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    constructor(private fb: FormBuilder, private trackService: TrackService,private genreService: GenreService) {
      this.uploadForm = this.fb.group({
        name: ['', Validators.required],
        mainArtist: ['', Validators.required],
        description: [''],
        audio: [null, Validators.required],
        image: [null],
        genreId: [null, Validators.required] 
      });
    }
  ngOnInit(): void {
      this.genreService.getGenres().subscribe((res) => {
        this.genres = res.data;
      });
    }
    onFileChange(event: any, type: 'audio' | 'image') {
      console.log(type);
      
      const file = event.target.files[0];
      if (type === 'audio') {
      this.audioFile = file;
      this.uploadForm.get('audio')?.setValue(file); // 👈 BẮT BUỘC để form hợp lệ
    } else {
        this.imageFile = file;
      }
    }

    submit() {
      if (this.uploadForm.invalid || !this.audioFile) {
        this.uploadForm.markAllAsTouched();
        return;
      }
      console.log('a')
      const formData = new FormData();
      formData.append('name', this.uploadForm.get('name')?.value);
      formData.append('mainArtist', this.uploadForm.get('mainArtist')?.value);
      formData.append('description', this.uploadForm.get('description')?.value || '');
      formData.append('file', this.audioFile!);
      formData.append('genreId', this.uploadForm.get('genreId')?.value);
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.trackService.uploadTrack(formData).subscribe({
        next: () => {
          this.uploadSuccess.emit();
        },
        error: (err) => {
          console.error('Upload failed:', err);
          alert('Tải lên thất bại.');
        }
      });
    }

    onCancel() {
      this.cancel.emit();
    }
  }
