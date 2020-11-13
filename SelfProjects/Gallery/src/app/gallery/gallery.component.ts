import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit,OnDestroy {
  images:any =[];
  mainImageOut :any;
  previewOut : any;
  zoomindex :number;
  private querySubscription: Subscription;
  constructor (private router: Router,private route: ActivatedRoute) {
   this.images.push('assets/whale.jpg');
   this.images.push('assets/blueWhale.webp');
   this.images.push('assets/fantasy.jpg');
   this.images.push('assets/nature.jpg');
   this.images.push('assets/planet.jpg');
   this.images.push('assets/jslogo.png');
   this.mainImageOut = this.images[4];
   this.querySubscription = route.queryParams.subscribe(
    (queryParam: any) => {
        this.mainImageOut ='assets/' + queryParam['img'];
    }
);
  }
  ChangedImageInPreview(image:any) {
      this.mainImageOut = image;
  }
  addImg () {
    let newImg: string = (document.querySelector('input') as HTMLInputElement).value;
    this.images.push(newImg);
  }
   delete () {
    for(let i =0; i<this.images.length; i++)
    {
      if(this.images[i] == this.mainImageOut) {
        this.images.splice(i,1);
      }
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy () : void {
    this.querySubscription;
  }

}