import { PlaylistPage } from './../playlist/playlist';
import { Network } from '@ionic-native/network';
import { LoaderProvider } from './../../providers/loader/loader';
import { SliderCardComponent } from './../../components/slider-card/slider-card';
import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Slides, LoadingController, AlertController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  random_album: any;
  random_playlist: any = {};
  @ViewChild(Slides) slides: Slides;
  access_token: string;
  featured_playlists:any = {};
  new_releases:any = {};
  categories:any = {};
  slides_end: boolean = false;
  slides_start: boolean = true;
  constructor(public navCtrl: NavController, public http: Http, public loader: LoaderProvider, private network: Network, private alertCtrl: AlertController,public toastCtrl:ToastController) {
    this.network.onDisconnect().subscribe(() => {
      loader.no_connection_start();
    });
    this.network.onConnect().subscribe(() => {
      loader.no_connection_end();
    });
    
    loader.start('البطة جاية فى السكة');
    let headers = new Headers();
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    headers.append("Authorization", "Basic " + btoa("d7474c1848e441f3ab9020d2736916da:cc8557a14fad43b59b028079ba7e36b7"));
    let options = new RequestOptions({ headers: headers });
    http.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.access_token = res.access_token;
      localStorage.setItem('access_token', this.access_token);
      console.log(this.access_token);
      this.get_featured_playlists();
      this.get_new_releases();
      this.get_categories();
      loader.end(1000);
    });
  }

  get_featured_playlists() {
    let headers = new Headers();
    // headers.append("Access-Control-Allow-Origin",'1');
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + this.access_token);
    let options = new RequestOptions({ headers: headers });
    this.http.get("https://api.spotify.com/v1/browse/featured-playlists", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.featured_playlists = res;
      console.log(this.featured_playlists);
      this.get_random_playlist();
    });
  }

  get_new_releases() {
    let headers = new Headers();
    // headers.append("Access-Control-Allow-Origin",'1');
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + this.access_token);
    let options = new RequestOptions({ headers: headers });
    this.http.get("https://api.spotify.com/v1/browse/new-releases", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.new_releases = res;
      console.log(this.new_releases);
      this.get_random_album();
    });
  }

  get_categories() {
    let headers = new Headers();
    // headers.append("Access-Control-Allow-Origin",'1');
    headers.append("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
    headers.append("Authorization", "Bearer " + this.access_token);
    let options = new RequestOptions({ headers: headers });
    this.http.get("https://api.spotify.com/v1/browse/categories", options).subscribe(data => {
      var res = JSON.parse(data['_body']);
      this.categories = res;
      console.log(this.categories);
    });
  }

  get_random_number(max){
    return Math.floor( Math.random()*max) ;
  }

  get_random_playlist(){
    this.random_playlist = this.featured_playlists.playlists.items[this.get_random_number(this.featured_playlists.playlists.items.length)];
  }
  get_random_album(){
    this.random_album = this.new_releases.albums.items[this.get_random_number(this.new_releases.albums.items.length)];
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
