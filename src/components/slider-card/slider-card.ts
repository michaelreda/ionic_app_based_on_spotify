import { PlaylistPage } from './../../pages/playlist/playlist';
import { Slides, NavController } from 'ionic-angular';
import { Component, ViewChild, Input } from '@angular/core';

/**
 * Generated class for the SliderCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'slider-card',
  templateUrl: 'slider-card.html'
})
export class SliderCardComponent {
  @ViewChild(Slides) slides: Slides;
  slides_end: boolean = false;
  slides_start: boolean = true;
  @Input() array: any;
  @Input() title: string;
  view_more:boolean=false;
  constructor(private navCtrl : NavController) {

  }

   icon_url(item) {
    if (item.images || item.icons) {
      if (item.type=="playlist"||item.type=="album") {
        return 'url(' + item.images[0].url + ')';
      } else {
        return 'url(' + item.icons[0].url + ')';
      }
    }else{
      return 'url(' + "http://www.freeiconspng.com/uploads/music-red-symbol-free-icon-27.png" + ')';
    }

  }

  open_page(item){
    if(item.type=="playlist")
      this.navCtrl.push(PlaylistPage,item);//passing a playlist
  }
}
