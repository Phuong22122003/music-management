import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TrackService } from '../../../../core/services/track.service';
import { selectRows } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-edit-bar',
  standalone: false,
  templateUrl: './edit-bar.component.html',
  styleUrl: './edit-bar.component.scss',
})
export class EditBarComponent implements OnInit {
  editFrom!: FormGroup;
  @Input() title!: string;
  @Input() description: string = '';
  @Input() privacy!: string;
  @Input() mainArtists: string = '';
  @Input() imageUrl: string = '';
  @Input() id!: number;
  @Output() onClickOutsideEdit = new EventEmitter<boolean>();
  @Output() updateSuccess = new EventEmitter<void>();

  @ViewChild('inputFile', { static: true }) inputFile!: ElementRef<any>;
  @ViewChild('thumbnail', { static: true }) thumbnail!: ElementRef<any>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private trackService: TrackService
  ) {}
  onClickOutside() {
    this.onClickOutsideEdit.emit(true);
  }
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
      privacy: [this.privacy, Validators.compose([Validators.required])],
    });
  }
  uploadImage() {
    this.inputFile.nativeElement.click();
    console.log(this.inputFile);
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnail.nativeElement.setAttribute('src', e.target?.result);
      };
      reader.readAsDataURL(this.inputFile.nativeElement.files[0]);
    }
  }
  onSubmit() {
    if (this.editFrom.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.editFrom.value.title);
    formData.append('description', this.editFrom.value.description);
    formData.append('mainArtist', this.editFrom.value.main_artists);
    formData.append(
      'isPublic',
      this.editFrom.value.privacy === 'public' ? 'true' : 'false'
    );
    // Nếu có file ảnh, thêm vào FormData
    const fileInput = this.inputFile.nativeElement.files[0];
    if (fileInput) {
      formData.append('image', fileInput);
    }
    this.trackService.updateTrack(this.id, formData).subscribe({
      next: (value) => {
        console.log(value);
        this.onClickOutsideEdit.emit(true);
        this.updateSuccess.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
    // Gửi dữ liệu lên backend qua API
  }
}
