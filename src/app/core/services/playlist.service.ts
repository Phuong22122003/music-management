import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Playlist } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'http://localhost:8080/api/v1/playlists';

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<ApiResponse<Playlist[]>> {
    return this.http.get<ApiResponse<Playlist[]>>(this.apiUrl);
  }

  createPlaylist(formData: FormData): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(this.apiUrl, formData);
  }

  updatePlaylist(id: number, formData: FormData): Observable<ApiResponse<Playlist>> {
    return this.http.put<ApiResponse<Playlist>>(`${this.apiUrl}/${id}`, formData);
  }

  deletePlaylist(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }

  addTrackToPlaylist(playlistId: number, trackId: number): Observable<ApiResponse<Playlist>> {
    return this.http.post<ApiResponse<Playlist>>(`${this.apiUrl}/${playlistId}/tracks/${trackId}`, {});
  }

  removeTrackFromPlaylist(playlistId: number, trackId: number): Observable<ApiResponse<Playlist>> {
    return this.http.delete<ApiResponse<Playlist>>(`${this.apiUrl}/${playlistId}/tracks/${trackId}`);
  }
}
