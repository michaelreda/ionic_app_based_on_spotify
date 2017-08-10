import { LoaderProvider } from './../../providers/loader/loader';
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
  displayed_tracks: any = [];
  tracks: any = [];
  selected_track_id: any;
  playlist: any;
  auto_play: string = "autoplay";
  i = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public playerP: PlayerProvider, public loader: LoaderProvider) {

    this.playlist = navParams.data;
    loader.start('loading '+this.playlist.type+'...');
    this.get_tracks();


    if (localStorage.getItem('auto_play') && localStorage.getItem('auto_play') == "false")
      this.auto_play = "";

    loader.end(3000);

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
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
    let options = new RequestOptions({ headers: headers });
    while (!this.playlist);
    if (this.playlist.type == "playlist") {
            this.http.get("https://api.spotify.com/v1/users/spotify/playlists/" + this.playlist.id + "/tracks", options).subscribe(data => {
              var res = JSON.parse(data['_body']);
              this.tracks = res.items;
              var j = 0;
              for (j = 0; j < 10; j++) {
                if (this.tracks[this.i + j] != undefined)
                  this.displayed_tracks.push(this.tracks[this.i + j]);
              }
              this.i += j;
              console.log(this.tracks);
              if (localStorage.getItem('auto_play') == "true")
                this.play_tracks();
            });
    }else if(this.playlist.type== "album"){
          this.http.get("https://api.spotify.com/v1/albums/"+this.playlist.id+"/tracks", options).subscribe(data => {
              var res = JSON.parse(data['_body']);
              this.tracks= [];
              for(let track of res.items){
                this.tracks.push({"track":track});
              }
              var j = 0;
              for (j = 0; j < 10; j++) {
                if (this.tracks[this.i + j] != undefined)
                  this.displayed_tracks.push(this.tracks[this.i + j]);
              }
              this.i += j;
              console.log(this.tracks);
              if (localStorage.getItem('auto_play') == "true")
                this.play_tracks();
            });
    }
  }


  play_track(track) {
    this.playerP.play_track(track);
  }

  play_tracks() {
    this.playerP.play_tracks(this.tracks);
  }

  load_more_tracks(infiniteScroll) {
    // console.log('Begin async operation');

    setTimeout(() => {
      console.log(this.i);
      var j = 0;
      for (j = 0; j < 10; j++) {
        if (this.tracks[this.i + j] != undefined)
          this.displayed_tracks.push(this.tracks[this.i + j]);
      }
      this.i += j;

      console.log(this.displayed_tracks);
      // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  icon_url(item) {
    if(!item){
      return 'url(' + this.playlist.images[2].url + ')';
    }
    if (item.images && item.images.length != 0) {
      return 'url(' + item.images[0].url + ')';
    } else {
      return 'url(' + "http://www.freeiconspng.com/uploads/music-red-symbol-free-icon-27.png" + ')';
    }

  }

  change_selected_track_color(id) {
    return id == this.selected_track_id ? 'primary' : 'dark';
  }
}
