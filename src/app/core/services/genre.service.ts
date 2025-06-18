import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Genre } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:8080/api/v1/genres';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<ApiResponse<Genre[]>> {
    return this.http.get<ApiResponse<Genre[]>>(this.apiUrl);
  }
  getActiveGenres(): Observable<ApiResponse<Genre[]>> {
    return this.http.get<ApiResponse<Genre[]>>(`${this.apiUrl}/active`);
  }
    createGenre(formData: FormData) {
    return this.http.post<ApiResponse<Genre>>(`${this.apiUrl}`, formData);
    }

    updateGenre(id: number, formData: FormData) {
    return this.http.put<ApiResponse<Genre>>(`${this.apiUrl}/${id}`, formData);
    }

    deleteGenre(id: number) {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
    }

}
