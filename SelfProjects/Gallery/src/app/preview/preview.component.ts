import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import {HostListener} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() images:any;
  curImage:string = 'assets/whale.jpg';
  @Output () ChangedImageInPreview = new EventEmitter <any>();
  constructor(private router: Router) { 
  }
  ngOnInit(): void {
  }
  changeImage (image:any) {
    this.curImage = image;
    this.ChangedImageInPreview.emit(this.curImage);
    this.router.navigate(['/gallery'],
    {
      queryParams: {'img': this.curImage.substring(7,this.curImage.length)}
    });
  }
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event:KeyboardEvent) {
    let index :number;
    if(event.key === 'ArrowRight') {
    if (this.images.indexOf(this.curImage) != this.images.length-1) {
    index = this.images.indexOf(this.curImage) + 1;
    }
     else {
       index = 0;
     }
     this.curImage = this.images[index];
    this.ChangedImageInPreview.emit(this.curImage);
    } 
    else {
      if(event.key === 'ArrowLeft') {
      if (this.images.indexOf(this.curImage) != 0) {
        index = this.images.indexOf(this.curImage) - 1;
        }
         else {
           index = this.images.length-1;
         }
         this.curImage = this.images[index];
    this.ChangedImageInPreview.emit(this.curImage);
    }
  }
  this.router.navigate(['/gallery'],
  {
    queryParams: {'img': this.curImage.substring(7,this.curImage.length)}
  });
  }
 
}

