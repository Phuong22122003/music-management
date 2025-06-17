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
  confirmingPlaylist: Playlist | null = null;

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
     this.confirmingPlaylist = playlist;
  }

  cancelDelete() {
  this.confirmingPlaylist = null; // đóng modal
}

confirmDelete() {
  if (this.confirmingPlaylist) {
    this.playlistService.deletePlaylist(this.confirmingPlaylist.id).subscribe(() => {
      this.fetchPlaylists();
      this.confirmingPlaylist = null; // đóng modal sau khi xoá
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
