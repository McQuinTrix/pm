import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverlayComponent } from './overlay/overlay.component';
import { LocationPanComponent } from './overlay/location-pan/location-pan.component';
import { TopbarComponent } from './overlay/topbar/topbar.component';
import { RightMenuComponent } from './overlay/right-menu/right-menu.component';
import { MenuListComponent } from './overlay/right-menu/menu-list/menu-list.component';
import { LeftComponent } from './overlay/left/left.component';
import { FooterComponent } from './overlay/footer/footer.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    LocationPanComponent,
    TopbarComponent,
    RightMenuComponent,
    MenuListComponent,
    LeftComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClient,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
