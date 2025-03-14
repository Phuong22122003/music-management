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
  @ViewChild('title', { static: true }) titleRef!: TemplateRef<any>;
  @ViewChild('engagements', { static: true }) engagementsRef!: TemplateRef<any>;
  @ViewChild('action', { static: true }) actionRef!: TemplateRef<any>;
  constructor(private trackService: TrackService) {}
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
  }
  formatDuration(duration: string): string {
    const parts = duration.split(':');
    return `${parts[0]}:${parts[1]}`; // Lấy giờ:phút (bỏ giây)
  }

  isShowedEdit = false;

  showEdit() {
    this.isShowedEdit = true;
    console.log(this.isShowDropdowByRow);
  }
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
  dropdownStyles = { left: '0px', position: 'fixed' };
  showDropDow(row: any, event: MouseEvent) {
    this.isShowDropdowByRow = row;
    console.log(this.isShowDropdowByRow);
    this.dropdownStyles = {
      position: 'fixed',
      // top: `${event.clientY}px`,  // Lấy vị trí Y của chuột
      left: `${event.clientX + 10}px`, // Lấy vị trí X của chuột
      // background: 'white',
      // border: '1px solid #ddd',
      // padding: '5px',
      // boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      // zIndex: '1000',
    };
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    // console.log(target);
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
      console.log(this.selectedRow);
      this.trackService.trackPlay.next({
        trackName: this.selectedRow['title']['name'],
        trackUrl: this.selectedRow['urlTrack'],
        username: this.selectedRow['title']['author'],
      });
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

  onDelete() {
    console.log(this.selectedRow['idTrack']);
    this.trackService.deleteTrack(this.selectedRow['idTrack']).subscribe({
      next: (value) => {
        console.log(value);
        this.fetchTrack();
      },
    });
  }
  // onPlayAudio(value: any) {
  //   console.log(value);
  //   this.trackService.trackPlay(value[])
  // }
}
