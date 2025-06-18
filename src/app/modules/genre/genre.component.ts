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
  confirmDeleteGenre: Genre | null = null;

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
  // Mở modal xác nhận thay vì confirm()
  this.confirmDeleteGenre = genre;
  }
  confirmDelete() {
    if (this.confirmDeleteGenre) {
      this.genreService.deleteGenre(this.confirmDeleteGenre.id).subscribe(() => {
        this.loadGenres();
        this.confirmDeleteGenre = null;
      });
    }
  }

  cancelDelete() {
    this.confirmDeleteGenre = null;
  }

  onCancel() {
    this.showForm = false;
  }

  onSaveSuccess() {
    this.showForm = false;
    this.loadGenres();
  }

  /** 🔑 MỚI: Sắp xếp theo tên A-Z */
  sortByName() {
    this.genres = [...this.genres].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /** 🔑 MỚI: Sắp xếp theo số lượng bài hát giảm dần */
  sortByTrackCount() {
    this.genres = [...this.genres].sort((a, b) =>
      (b.tracks?.length || 0) - (a.tracks?.length || 0)
    );
  }
    sortByCreatedAt() {
    this.genres = [...this.genres].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
