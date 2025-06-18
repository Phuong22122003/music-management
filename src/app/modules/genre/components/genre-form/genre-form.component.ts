import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreService } from '../../../../core/services/genre.service';
import { Genre } from '../../../../core/models/model';


@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss'],
  standalone: false
})
export class GenreFormComponent implements OnInit {
  @Input() genre: Genre | null = null;
  @Output() saveSuccess = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  imageFile: File | null = null;
  serverError: string | null = null;
  constructor(private fb: FormBuilder, private genreService: GenreService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.genre?.name || '', Validators.required],
      description: [this.genre?.description || ''],
      isActive: [this.genre?.isActive ?? true],
      image: [null],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.imageFile = file;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Tạo object giống GenreRequest
    const genreRequest = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value || '',
      isActive: this.form.get('isActive')?.value,
    };

    const formData = new FormData();
    formData.append('genre', new Blob(
      [JSON.stringify(genreRequest)],
      { type: 'application/json' })
    );

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    const request$ = this.genre
      ? this.genreService.updateGenre(this.genre.id, formData)
      : this.genreService.createGenre(formData);

    request$.subscribe({
      next: () => {
        this.serverError = null;
        alert(this.genre ? 'Cập nhật thể loại thành công' : 'Tạo thể loại thành công');
        this.saveSuccess.emit();
      },
      error: (err) => {
        this.serverError = err?.error?.message || 'Đã xảy ra lỗi. Vui lòng thử lại!';
      },
    });
  }


  onDelete() {
    if (this.genre && confirm('Bạn chắc chắn muốn xóa thể loại này?')) {
      this.genreService.deleteGenre(this.genre.id).subscribe(() => {
        alert('Xóa thể loại thành công');
        this.saveSuccess.emit();
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
