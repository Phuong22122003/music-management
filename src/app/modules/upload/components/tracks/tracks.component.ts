import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TrackService } from '../../../../core/services/track.service';
import { Track } from '../../../../core/models/track';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-tracks',
  standalone: false,
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent implements OnInit {
  rows: any;
  columns: any;
  trackList: Track[] = [];
  selectedRow: any;
  isPlay: boolean = false;
  urlPlaying: string = '';
  genreId: number | null = null;
  @ViewChild('title', { static: true }) titleRef!: TemplateRef<any>;
  @ViewChild('engagements', { static: true }) engagementsRef!: TemplateRef<any>;
  @ViewChild('action', { static: true }) actionRef!: TemplateRef<any>;
  constructor(
    private trackService: TrackService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.columns = [
      { name: 'TITLE', prop: 'title', cellTemplate: this.titleRef },
      { name: 'LENGTH', prop: 'length' },
      { name: 'DATE', prop: 'date' },
      {
        name: 'ENGAGEMENTS',
        prop: 'engagements',
        cellTemplate: this.engagementsRef,
      },
      { name: 'LISTENING', prop: 'listening' },
      { name: '', prop: '', cellTemplate: this.actionRef },
    ];
    this.fetchTrack();
    this.trackService.trackPlay.subscribe((trackInfo) => {
      console.log(trackInfo);
      this.isPlay = trackInfo.isPlay;
      this.urlPlaying = trackInfo.trackUrl;
    });
  }
  formatDuration(duration: string): string {
    const parts = duration.split(':');
    return `${parts[0]}:${parts[1]}`; // Lấy giờ:phút (bỏ giây)
  }

  isShowedEdit = false;

  hideEdit() {
    this.isShowedEdit = false;
  }

  isPlayedByRow: any = null;
  showPlayButton(row: any) {
    this.isPlayedByRow = row;
    // alert('')
  }
  hidePlayButton() {
    this.isPlayedByRow = null;
  }
  isShowDropdowByRow: any = null;
  dropdownStyles: any = { left: '0px', position: 'fixed' };
  showDropDow(row: any, event: MouseEvent) {
    this.isShowDropdowByRow = row;

    this.dropdownStyles = {
      position: 'fixed',
      // top: `${event.clientY}px`,  // Lấy vị trí Y của chuột
      left: `${event.clientX + 10000}px`, // Lấy vị trí X của chuột
    };
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    // if(this.isShowDropdowByRow!=null )

    if (
      this.isShowDropdowByRow != null &&
      target.tagName.toLocaleLowerCase() !== 'div' &&
      target.getAttribute('data-type') !== 'dropdow-icon'
    ) {
      this.isShowDropdowByRow = null;
    }
  }

  onActivate(event: any) {
    if (event.type === 'click') {
      this.selectedRow = event.row;
    }
  }
  fetchTrack() {
    console.log('fetch');
    this.trackService.getTrackList().subscribe({
      next: (response) => {
        this.trackList = response.data;
        this.rows = this.trackList.map((item) => ({
          title: {
            imageUrl: item.image, // Lấy ảnh từ API
            name: item.nameTrack, // Đổi tên key
            author: item.userName, // Đổi tên key
          },
          length: item.duration, // Chuyển đổi thời lượng
          date: item.createdAt, // Format ngày
          engagements: {
            like: item.likeCount.toString(), // Chuyển số thành chuỗi
            comment: item.commentCount.toString(),
          },
          listening: item.viewCount.toString(),
          description: item.description,
          mainArtist: item.mainArtist,
          isPublic: item.isPublic,
          idTrack: item.idTrack,
          urlTrack: item.urlTrack,
        }));
        console.log(this.rows);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showEdit(row: any) {
    this.selectedRow = row;
    const track = this.trackList.find(
      (item) => item.idTrack === row['idTrack']
    );
    this.genreId = track?.genre?.id ?? null;

    this.isShowedEdit = true;
  }

  showConfirmDialog = false;
  trackToDelete: any = null;

  onDelete(row: any) {
    this.trackToDelete = row;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (this.trackToDelete) {
      this.trackService.deleteTrack(this.trackToDelete['idTrack']).subscribe({
        next: () => {
          this.toastService.toastSuccess.next({
            message: 'Delete track successfully!',
            summary: 'Success',
          });
          this.fetchTrack();
        },
        error: (err) => {
          console.error('Failed to delete:', err);
        },
      });
    }
    this.showConfirmDialog = false;
    this.trackToDelete = null;
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.trackToDelete = null;
  }

  onPlayAudio(value: any) {
    if (this.urlPlaying !== value['urlTrack']) {
      this.isPlay = true;
    } else {
      this.isPlay = !this.isPlay;
    }
    console.log(this.isPlay);
    this.trackService.trackPlay.next({
      trackName: value['title']['name'],
      trackUrl: value['urlTrack'],
      username: value['title']['author'],
      isPlay: this.isPlay,
    });
  }
}
