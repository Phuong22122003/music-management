import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-bar',
  standalone: false,
  templateUrl: './edit-bar.component.html',
  styleUrl: './edit-bar.component.scss'
})
export class EditBarComponent implements OnInit{
  editFrom!: FormGroup;
  @Input() title!:string;
  @Input() description:string="";
  @Input() privacy!:string;
  @Input() mainArtists:string="";
  @Output() onClickOutsideEdit = new EventEmitter<boolean>;


  @ViewChild('inputFile',{static:true}) inputFile!: ElementRef<any>;
  @ViewChild('thumbnail',{static:true}) thumbnail!: ElementRef<any>;
  constructor(private formBuilder: FormBuilder){}
  onClickOutside(){
    this.onClickOutsideEdit.emit(true);
  }
  ngOnInit(): void {
    this.editFrom = this.formBuilder.group({
      title:[
        this.title,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)
        ])
      ],
      description:[
        this.description,
      ],
      main_artists:[
        this.mainArtists,
      ],
      privacy:[
        this.privacy,
        Validators.compose([
          Validators.required,
        ])
      ],

    })
  }
  uploadImage(){
    this.inputFile.nativeElement.click()
    console.log(this.inputFile);
  } 
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      let reader = new FileReader();
      reader.onload=(e)=>{
          this.thumbnail.nativeElement.setAttribute("src",e.target?.result)
      }
        reader.readAsDataURL(this.inputFile.nativeElement.files[0])
    }
  }
}
