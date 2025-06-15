import { Component } from '@angular/core';
import { Genre } from '../../core/models/model';
import { GenreService } from '../../core/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  standalone:false
})
export class GenreComponent {
  genres: Genre[] = [];
  showForm = false;
  selectedGenre: Genre | null = null;

  constructor(private genreService: GenreService) {}

  ngOnInit() {
    this.loadGenres();
  }

  loadGenres() {
    this.genreService.getGenres().subscribe((res) => {
      this.genres = res.data;
    });
  }

  onAdd() {
    this.selectedGenre = null;
    this.showForm = true;
  }

  onEdit(genre: Genre) {
    this.selectedGenre = genre;
    this.showForm = true;
  }

  onDelete(genre: Genre) {
    if (confirm(`Bạn có chắc muốn xóa thể loại "${genre.name}" không?`)) {
      this.genreService.deleteGenre(genre.id).subscribe(() => {
        this.loadGenres();
      });
    }
  }

  onCancel() {
    this.showForm = false;
  }

  onSaveSuccess() {
    this.showForm = false;
    this.loadGenres();
  }
}
