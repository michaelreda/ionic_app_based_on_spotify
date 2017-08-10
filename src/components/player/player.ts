import { PlayerProvider } from './../../providers/player/player';
import { Component } from '@angular/core';
import { ToastController } from "ionic-angular";

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
  current_track: any;
  auto_play: string = "autoplay";
  constructor(public playerP: PlayerProvider,private toastCtrl: ToastController) {
    
    
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
      }else{
        this.current_track=track.preview_url;
      }
    });
  }

  song_ended(){
      this.playerP.current_track_ended.emit();
  }
}
