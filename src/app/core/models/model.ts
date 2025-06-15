export interface LoginResponse {
  token: string;
  email: string;
}

import { Track } from './track';

export interface Genre {
  id: number;
  name: string;
  description: string;
  imageName: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  tracks: Track[];
}

export interface Playlist{
  id: number;
  name: string;
  description: string;
  imageName: string;
  createdAt: string; // ISO date string
  userEmail: string;
  tracks: Track[];
}