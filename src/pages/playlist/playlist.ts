import { PlayerProvider } from './../../providers/player/player';
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
  tracks: any = [];
  selected_track_id: any;
  playlist: any;
  auto_play: string = "autoplay";
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loadingCtrl: LoadingController, public playerP: PlayerProvider) {

    let loading = this.loadingCtrl.create({
      content: 'loading playlist...'
    });
    loading.present();

    this.playlist = navParams.data;
    this.get_tracks();


    if (localStorage.getItem('auto_play') && localStorage.getItem('auto_play') == "false")
      this.auto_play = "";

    setTimeout(() => {
      loading.dismiss();
    }, 1000);

    playerP.current_track_changed.subscribe(track => {
      console.log("selected_track_id_changed");
      this.selected_track_id = track.id;
    })
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
    while (!this.playlist);
    this.http.get("https://api.spotify.com/v1/users/spotify/playlists/" + this.playlist.id + "/tracks", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.tracks = res.items;
      console.log(this.tracks);
      if (localStorage.getItem('auto_play') == "true")
        this.play_tracks();
    });
  }


  play_track(track) {
    this.playerP.play_track(track);
  }

  play_tracks() {
    this.playerP.play_tracks(this.tracks);
  }

  icon_url(item) {
    if (item.images && item.images.length!=0) {
        return 'url(' + item.images[0].url + ')';
    }else{
      return 'url(' + "http://www.freeiconspng.com/uploads/music-red-symbol-free-icon-27.png" + ')';
    }

  }

  change_selected_track_color(id) {
    return id == this.selected_track_id ? 'primary' : 'dark';
  }
}
