import { Component } from '@angular/core';
import { Playlist } from '../../../../core/models/model';
import { PlaylistService } from '../../../../core/services/playlist.service';

@Component({
  selector: 'app-playlist-list',
  standalone: false,
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss'
})
export class PlaylistListComponent {
  playlists: Playlist[] = [];
  expandedPlaylistId: number | null = null;

  constructor(private playlistService: PlaylistService) { }

  toggleExpand(playlistId: number) {
  this.expandedPlaylistId = this.expandedPlaylistId === playlistId ? null : playlistId;
}

  ngOnInit(): void {
    this.fetchPlaylists();
  }

  fetchPlaylists() {
    this.playlistService.getPlaylists().subscribe((res) => {
      this.playlists = res.data;
    });
  }


  onDelete(playlist: Playlist) {
    if (confirm(`Bạn có chắc muốn xoá playlist "${playlist.name}"?`)) {
      this.playlistService.deletePlaylist(playlist.id).subscribe(() => {
        this.fetchPlaylists();
      });
    }
  }
  showForm = false;
  selectedPlaylist: Playlist | null = null;

  onAdd() {
    this.selectedPlaylist = null;
    this.showForm = true;
  }

  onEdit(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    this.showForm = true;
  }

  onCancel() {
    this.showForm = false;
    this.selectedPlaylist = null;
  }

  onSaveSuccess() {
    this.fetchPlaylists();
    this.showForm = false;
  }

}
