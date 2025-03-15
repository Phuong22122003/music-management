import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
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
  audioUrl = '';
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;
  @ViewChild('processBar', { static: true }) processBar!: ElementRef;
  trackTitle = '';
  artist = 'Tranvietquang3110';
  isShow = false;
  isPlay = true;
  progress = 0;
  currentTime = 0;
  duration = 86;
  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlay = true;
    } else {
      audio.pause();
      this.isPlay = false;
    }
    this.trackService.trackPlay.next({
      trackUrl: this.audioUrl,
      username: this.artist,
      trackName: this.trackTitle,
      isPlay: this.isPlay,
    });
  }

  constructor(
    private trackService: TrackService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.trackService.trackPlay.subscribe((trackInfo) => {
      console.log('New track URL:', trackInfo);
      this.isShow = true;
      const audio = this.audioPlayer.nativeElement;
      this.isPlay = trackInfo.isPlay;
      if (trackInfo.trackUrl !== this.audioUrl) {
        this.audioUrl = trackInfo.trackUrl;
        this.trackTitle = trackInfo.trackName;
        this.artist = trackInfo.username;
        audio.src = this.audioUrl;
      }
      if (trackInfo.isPlay) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }
  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (audio.currentTime / audio.duration) * 100;

    this.renderer.setStyle(
      this.processBar.nativeElement,
      'width',
      `${Math.round(this.progress)}%`
    );
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
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.togglePlay();

      console.log('Space pressed! Audio toggled.');
    }
  }
}
