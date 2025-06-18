import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TrackService } from '../../../../core/services/track.service';
import { ToastService } from '../../../../core/services/toast.service';
import { GenreService } from '../../../../core/services/genre.service';
import { Genre } from '../../../../core/models/model';

@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss'],
  standalone: false,
})
export class EditBarComponent implements OnInit {
  editFrom!: FormGroup;

  @Input() title!: string;
  @Input() description: string = '';
  @Input() privacy!: string;
  @Input() mainArtists: string = '';
  @Input() imageUrl: string = '';
  @Input() id!: number;
  @Input() genreId!: number;

  @Output() onClickOutsideEdit = new EventEmitter<boolean>();
  @Output() updateSuccess = new EventEmitter<void>();

  @ViewChild('inputFile', { static: true }) inputFile!: ElementRef<any>;
  @ViewChild('thumbnail', { static: true }) thumbnail!: ElementRef<any>;
  @ViewChild('modal', { static: true }) modal!: ElementRef<any>;
  @ViewChild('dropdown', { static: true }) dropdown!: ElementRef<any>;

  genres: Genre[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private trackService: TrackService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.editFrom = this.formBuilder.group({
      title: [
        this.title,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3),
        ]),
      ],
      description: [this.description],
      main_artists: [this.mainArtists],
      privacy: [this.privacy, Validators.required],
      genre: [this.genreId],
    });

    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getGenres().subscribe({
      next: (res) => {
        this.genres = res.data;
      },
      error: (err) => {
        console.error('Error loading genres:', err);
      },
    });
  }

  onClickOutside() {
    this.renderer.addClass(this.modal.nativeElement, 'animation-disappear');
    this.renderer.removeClass(this.modal.nativeElement, 'animation-appear');
    this.renderer.setStyle(this.dropdown.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.dropdown.nativeElement,
      'background-color',
      '#FFF'
    );
    setTimeout(() => {
      this.onClickOutsideEdit.emit(true);
    }, 500);
  }

  uploadImage() {
    this.inputFile.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail.nativeElement.setAttribute('src', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.editFrom);
    if (this.editFrom.invalid) return;

    const formData = new FormData();
    formData.append('title', this.editFrom.value.title);
    formData.append('description', this.editFrom.value.description);
    formData.append('mainArtist', this.editFrom.value.main_artists);
    formData.append(
      'isPublic',
      this.editFrom.value.privacy === 'public' ? 'true' : 'false'
    );
    if (this.editFrom.value.genre) {
      formData.append('genreId', this.editFrom.value.genre.toString());
    }

    const fileInput = this.inputFile.nativeElement.files[0];
    if (fileInput) {
      formData.append('image', fileInput);
    }

    this.trackService.updateTrack(this.id, formData).subscribe({
      next: () => {
        this.onClickOutside();
        this.updateSuccess.emit();
        this.toastService.toastSuccess.next({
          summary: 'Success',
          message: 'Track updated successfully!',
        });
      },
      error: (err) => {
        console.error(err);
        this.toastService.toastSuccess.next({
          summary: 'Error',
          message: err.message,
        });
      },
    });
  }
}
