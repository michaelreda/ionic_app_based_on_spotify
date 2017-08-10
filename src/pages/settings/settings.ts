import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  auto_play: boolean = true;
  loop: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem('auto_play'))
      this.auto_play = localStorage.getItem('auto_play') == "true";
    else
      localStorage.setItem('auto_play', "true");

    if (localStorage.getItem('loop'))
      this.loop = localStorage.getItem('loop') == "true";
    else
      localStorage.setItem('loop', "true");
  }

  auto_play_toggle() {
    console.log(this.auto_play);
    if (this.auto_play)
      localStorage.setItem('auto_play', "true");
    else
      localStorage.setItem('auto_play', "false");
  }

  loop_toggle() {
    console.log(this.loop);
    if (this.loop)
      localStorage.setItem('loop', "true");
    else
      localStorage.setItem('loop', "false");
  }

}
