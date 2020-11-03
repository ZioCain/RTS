// module that will hold the whole UI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HudComponent } from '../hud/hud.component';

import { ResourceComponent } from './resource/resource.component';
import { MenuComponent } from '../hud/menu/menu.component';
import { ItemComponent } from '../hud/menu/item/item.component';

@NgModule({
	declarations: [ResourceComponent, MenuComponent, HudComponent, ItemComponent],
	imports: [
		CommonModule
	],
	exports:[
		HudComponent
	],
	bootstrap:[
		HudComponent
	]
})
export class HUDModule { }
