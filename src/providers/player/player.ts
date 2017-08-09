import { ToastController } from 'ionic-angular';
import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlayerProvider {
  tracks: any;
  current_track: any;
  tracks_to_be_played: any = [];
  @Input() current_track_ended = new EventEmitter<any>();
  @Output() current_track_changed = new EventEmitter<any>();


  constructor(public http: Http,public toastCtrl:ToastController) {
    this.current_track_ended.subscribe(()=>{
      this.play_next_track();
    });
  }

  play_track(track) {
    console.log("play track");
    let headers = new Headers();
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
    let options = new RequestOptions({ headers: headers });
    this.http.get("https://api.spotify.com/v1/tracks/" + track.id, options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      if (!this.current_track || res.id != this.current_track.id) {
        this.current_track = res;
        this.current_track_changed.emit(this.current_track);
      } else {
        console.log("same track")
      }
      console.log(res);
    });
  }

  play_tracks(tracks) {
    if (tracks) {
      this.play_track(tracks[0].track);//play first track
      var tmp_tracks= [];
      tmp_tracks=tmp_tracks.concat(tracks);
      tmp_tracks.shift(); //remove first track
      this.tracks_to_be_played=this.tracks_to_be_played.concat(tmp_tracks);
    }
  }

  play_next_track(){
    console.log("playing next track");
    if(this.tracks_to_be_played.length==0){
      this.toastCtrl.create({
          message: 'No more songs in your playlist',
          duration: 3000,
        }).present();
    }else{
      console.log(this.tracks_to_be_played);
      this.play_track(this.tracks_to_be_played[0].track);
      this.tracks_to_be_played.shift();
    }
      
  }


}
