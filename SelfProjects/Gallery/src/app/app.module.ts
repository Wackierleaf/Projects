import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PreviewComponent } from './preview/preview.component';
import { MainImageComponent } from './main-image/main-image.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PreviewComponent,
    MainImageComponent,
    FullscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
