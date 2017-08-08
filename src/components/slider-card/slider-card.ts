import { Slides } from 'ionic-angular';
import { Component, ViewChild, Input } from '@angular/core';

/**
 * Generated class for the SliderCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'slider-card',
  templateUrl: 'slider-card.html'
})
export class SliderCardComponent {
  @ViewChild(Slides) slides: Slides;
  slides_end: boolean = false;
  slides_start: boolean = true;
  @Input() array: any;
  @Input() title: string;
  view_more:boolean=false;
  constructor() {

  }

}
