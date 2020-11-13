import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {GalleryComponent} from './gallery/gallery.component';
import {MainImageComponent} from './main-image/main-image.component';
import {PreviewComponent} from './preview/preview.component';
import {FullscreenComponent} from './fullscreen/fullscreen.component';
import {FsGuardGuard} from './fs-guard.guard';
const routes: Routes = [
  {
    path:'gallery',
    component: GalleryComponent
  },
  {
    path: 'fullscreen',
    component: FullscreenComponent,
    canActivate : [FsGuardGuard]
  },
  {
    path: '**', 
    redirectTo:'/gallery'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [FsGuardGuard]
})
export class AppRoutingModule { }
