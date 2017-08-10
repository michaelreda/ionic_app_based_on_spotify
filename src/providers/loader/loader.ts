import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';


/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  loading:any;
  constructor( public loadingCtrl: LoadingController) {

  }

  start(text){
    // var loading_icon= "";
    var loading_icon = "<div class='loading-spinner'><img  src='assets/duck_loader.gif' class='loader-img'></div> ";
    this.loading = this.loadingCtrl.create({
      content: loading_icon+ text,
      spinner:'hide'
    });
    this.loading.present();
  }

  end(time){
     setTimeout(() => {
      this.loading.dismiss();
    }, time);
  }

}
