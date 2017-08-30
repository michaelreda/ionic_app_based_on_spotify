import { NgModule } from '@angular/core';
import { SliderCardComponent } from './slider-card/slider-card';
import { PlayerComponent } from './player/player';

@NgModule({
	declarations: [SliderCardComponent,
    PlayerComponent],
	imports: [],
	exports: [SliderCardComponent,
    PlayerComponent]
})
export class ComponentsModule {}
