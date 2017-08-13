import { PlayerProvider } from './../../providers/player/player';
import { Component } from '@angular/core';
import { ToastController } from "ionic-angular";
import { Observable } from "rxjs/Rx";

/**
 * Generated class for the PlayerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'player',
  templateUrl: 'player.html'
})
export class PlayerComponent {
  track: any;
  current_track: any;
  auto_play: string = "autoplay";
  track_details: boolean = false;
  constructor(public playerP: PlayerProvider, private toastCtrl: ToastController) {


    if (localStorage.getItem('auto_play') && localStorage.getItem('auto_play') == "false")
      this.auto_play = "";

    playerP.current_track_changed.subscribe(track => {
      console.log("current_track_changed");
      if (track.preview_url == null) {
        console.log("null preview_url");
        // this.toastCtrl.create({
        //   message: 'Sorry this song is not available now',
        //   duration: 3000,
        // }).present();
        this.playerP.play_next_track();
      } else {
        this.current_track = track.preview_url;
        this.track = track;
        if (document.getElementById("audio")) {
          var audio: any = document.getElementById("audio");
          audio.volume = 0;
          this.audio_fadein(audio);
        }
      }
    });
  }

  song_ended() {
    this.playerP.current_track_ended.emit();

  }

  clicked() {
    console.log(this.track);
    this.track_details = !this.track_details;
  }
  icon_url(item) {
    if (!item) {
      return 'url(' + this.track.images[2].url + ')';
    }
    if (item.images && item.images.length != 0) {
      return 'url(' + item.images[0].url + ')';
    } else {
      return 'url(' + "http://www.freeiconspng.com/uploads/music-red-symbol-free-icon-27.png" + ')';
    }

  }

  time_updated() {
    var audio: any = document.getElementById("audio");
    // console.log(audio.currentTime);
    if (audio.currentTime > 27) {
      this.audio_fadeout(audio);
    }
  }

  audio_fadeout(audio: any) {
    var o = Observable.interval(375).subscribe(x => {
      if (audio.volume - 0.125 > 0)
        audio.volume -= 0.125;
      else
        o.unsubscribe();
    });
  }

  audio_fadein(audio: any) {
    var o = Observable.interval(375).subscribe(x => {
      if (audio.volume + 0.1 < 1)
        audio.volume += 0.1;
      else
        o.unsubscribe();
    });
  }

}
