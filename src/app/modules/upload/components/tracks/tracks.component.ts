import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tracks',
  standalone: false,
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss'
})
export class TracksComponent implements OnInit{
  rows:any;
  columns:any;

  @ViewChild('title',{static:true}) titleRef!:TemplateRef<any>;
  @ViewChild('engagements',{static:true}) engagementsRef!:TemplateRef<any>;
  @ViewChild('action',{static:true}) actionRef!:TemplateRef<any>;
  constructor(){
  }
  ngOnInit(): void {
    this.columns=[
      {name:'TITLE',prop:'title',cellTemplate:this.titleRef},
      {name:'LENGTH',prop:'length'},
      {name:'DATE',prop:'date'},
      {name:'ENGAGEMENTS',prop:'engagements',cellTemplate:this.engagementsRef},
      {name:'LISTENING',prop:'listening'},
      {name:'',prop:'',cellTemplate:this.actionRef},
    ]
    this.rows = this.createMockData();
  }
  createMockData(){
    const mock_data = [
      {
        title:{
          imageUrl:'./assets/images/avatar.jpg',
          name:"Nhac nhe",
          author:'phuong'
        },
        length: '1.28',
        date:'17 sept. 2023',
        engagements:{
          like:'0',
          comment:'10'
        },
        listening:'10'
      },
      {
        title:{
          imageUrl:'./assets/images/avatar.jpg',
          name:"Nhac nhe",
          author:'phuong'
        },
        length: '1.28',
        date:'17 sept. 2023',
        engagements:{
          like:'0',
          comment:'10'
        },
        listening:'10'
      },
      {
        title:{
          imageUrl:'./assets/images/avatar.jpg',
          name:"Nhac nhe",
          author:'phuong'
        },
        length: '1.28',
        date:'17 sept. 2023',
        engagements:{
          like:'0',
          comment:'10'
        },
        listening:'10'
      },
    ]
    return mock_data;
  }

  isShowedEdit=false;

  showEdit(){
    this.isShowedEdit=true;
  }
  hideEdit(){
    this.isShowedEdit=false;
  }

  isPlayedByRow:any = null;
  showPlayButton(row:any){
    this.isPlayedByRow = row;
    // alert('')
  }
  hidePlayButton(){
    this.isPlayedByRow=null;
  }
  isShowDropdowByRow:any = null;
  dropdownStyles = {  left: '0px', position: 'fixed' };
  showDropDow(row:any,event:MouseEvent){
    this.isShowDropdowByRow=row;
    this.dropdownStyles = {
      position: 'fixed',
      // top: `${event.clientY}px`,  // Lấy vị trí Y của chuột
      left: `${event.clientX+10}px`, // Lấy vị trí X của chuột
      // background: 'white',
      // border: '1px solid #ddd',
      // padding: '5px',
      // boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      // zIndex: '1000',
    };
    console.log(this.dropdownStyles)
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    console.log(target)
    // if(this.isShowDropdowByRow!=null )
    if(this.isShowDropdowByRow!=null && target.tagName.toLocaleLowerCase()!=='div' && target.getAttribute('data-type') !== 'dropdow-icon' ){
      this.isShowDropdowByRow = null;
    }
  }
}
