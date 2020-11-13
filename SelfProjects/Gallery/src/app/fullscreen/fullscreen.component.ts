import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent implements OnInit,OnDestroy {
  fullImg :any;
  commonScreen(): void {
    this.router.navigate(['/gallery'], 
    {
      queryParams: {'img' : this.fullImg.substring(7,this.fullImg.length)}
    });
  }

    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute, private router: Router){
         
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.fullImg ='assets/' + queryParam['img'];
            }
        );
    }

  ngOnInit(): void {
  }
  ngOnDestroy():void {
    this.querySubscription;
  }
}
