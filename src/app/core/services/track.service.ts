import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  apiUrl = 'http://localhost:8080/api/v1/tracks';
  constructor(private http: HttpClient) {}
  trackPlay = new Subject<{
    trackUrl: string;
    username: string;
    trackName: string;
    isPlay: boolean;
  }>();
  getTrackList(): Observable<ApiResponse<Track[]>> {
    return this.http.get<ApiResponse<Track[]>>(this.apiUrl);
  }

  getTrack(): Observable<ApiResponse<Track>> {
    return this.http.get<ApiResponse<Track>>(this.apiUrl);
  }

  deleteTrack(id: string): Observable<ApiResponse<String>> {
    return this.http.delete<ApiResponse<String>>(this.apiUrl + '/' + id);
  }
  updateTrack(id: number, formData: FormData) {
    return this.http.put<ApiResponse<Track>>(
      this.apiUrl + '/' + id,
      formData
    );
  }
  uploadTrack(formData: FormData) {
    return this.http.post(`${this.apiUrl}`, formData);
  }

}
