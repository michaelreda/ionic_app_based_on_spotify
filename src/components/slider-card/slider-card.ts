import { RequestOptions, Http, Headers } from '@angular/http';
import { PlaylistPage } from './../../pages/playlist/playlist';
import { Slides, NavController, AlertController, ToastController } from 'ionic-angular';
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
  view_more: boolean = false;
  constructor(private navCtrl: NavController, private http: Http, public alertCtrl: AlertController,public toastCtrl:ToastController) {

  }

  icon_url(item) {
    if (item.images || item.icons) {
      if (item.type == "playlist" || item.type == "album") {
        return 'url(' + item.images[0].url + ')';
      } else {
        return 'url(' + item.icons[0].url + ')';
      }
    } else {
      return 'url(' + "http://www.freeiconspng.com/uploads/music-red-symbol-free-icon-27.png" + ')';
    }

  }

  open_page(item) {
    if (item.type == "playlist" || item.type == "album") {
      console.log("hi");
      this.navCtrl.push(PlaylistPage, item);//passing a playlist
    } else {
      let headers = new Headers();
      headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
      headers.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
      let options = new RequestOptions({ headers: headers });
      this.http.get(item.href + "/playlists", options).subscribe(data => {
        var res = JSON.parse(data['_body']);
        let playlists = res.playlists.items;
        let inputs = [];
        for (var playlist of playlists) {
          inputs.push({
            type: 'radio',
            label: playlist.name,
            value: playlist.id
          })
        }
        this.alertCtrl.create({
          title: 'Select a playlist',
          inputs: inputs,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {

              }
            },
            {
              text: 'Play',
              handler: data => {
                console.log(data);
                if (!data) {
                  this.toastCtrl.create({
                    message: 'Please select a playlist',
                    duration: 3000,
                  }).present();
                }
                this.navCtrl.push(PlaylistPage, {id:data,type:"playlist"});
              }
            }
          ]
        }).present();

      });
    }

  }
}
