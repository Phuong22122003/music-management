import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getTrack() :Observable<ApiResponse<Track[]>> {
    return this.http.get<ApiResponse<Track[]>>("");
  }
}
