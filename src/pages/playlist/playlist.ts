import { Http, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// import { NativeAudio } from '@ionic-native/native-audio';


/**
 * Generated class for the PlaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  tracks: any=[];
  selectedTrack: any;
  playlist = {};
  hi
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'loading playlist...'
    });
    loading.present();

    this.playlist = navParams.data;
    this.get_tracks();
    

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PlaylistPage');
  // }

  get_tracks() {
    let headers = new Headers();
    // headers.append("Access-Control-Allow-Origin",'1');
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
    let options = new RequestOptions({ headers: headers });
    this.http.get("https://api.spotify.com/v1/users/spotify/playlists/37i9dQZF1DXdPec7aLTmlC/tracks", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.tracks = res.items;
      
      console.log(this.tracks);
    });
  }


   icon_url(item){
    if(item.images){
      return 'url('+item.images[0].url+')';
    }else{
      return 'url('+item.icons[0].url+')';
    }
  }
}
