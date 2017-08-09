import { SliderCardComponent } from './../../components/slider-card/slider-card';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Slides, LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  access_token: string;
  featured_playlists = {};
  new_releases = {};
  categories = {};
  slides_end: boolean = false;
  slides_start: boolean = true;
  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'El bata btdanden...'
    });
    loading.present();
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

      setTimeout(() => {
        loading.dismiss();
      }, 1000);
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

}
