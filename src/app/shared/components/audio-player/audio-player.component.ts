import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TrackService } from '../../../core/services/track.service';

@Component({
  selector: 'app-audio-player',
  standalone: false,
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  @Input('audioUrl') audioUrl = ''; // Đường dẫn file audio từ Spring Boot API
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;
  trackTitle = '';
  artist = 'Tranvietquang3110';
  isShow = false;
  isPaused = true;
  progress = 0;
  currentTime = 0;
  duration = 86;

  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPaused = false;
    } else {
      audio.pause();
      this.isPaused = true;
    }
  }

  constructor(private trackService: TrackService) {}
  ngOnInit(): void {
    this.trackService.trackPlay.subscribe((trackInfo) => {
      console.log('New track URL:', trackInfo);
      console.log(this.audioPlayer);
      this.isShow = true;
      const audio = this.audioPlayer.nativeElement;
      const wasPlaying = !audio.paused; // Kiểm tra xem có đang phát không

      audio.pause(); // Dừng nhạc hiện tại
      this.audioUrl = trackInfo.trackUrl;
      this.trackTitle = trackInfo.trackName;
      this.artist = trackInfo.username;
      audio.src = this.audioUrl; // Gán URL mới
      audio.load(); // Load lại audio mới

      if (wasPlaying) {
        audio.play(); // Nếu trước đó đang phát, tiếp tục phát
      }
    });
  }
  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = (event.target.value / 100) * audio.duration;
  }

  setDuration() {
    console.log(this.audioPlayer.nativeElement.duration);
    this.duration = this.audioPlayer.nativeElement.duration;
  }
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }
  ngOnDestroy(): void {
    this.trackService.trackPlay.unsubscribe();
  }
}
