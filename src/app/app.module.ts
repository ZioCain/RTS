import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HUDModule } from './hud/hud.module';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent
	],
	imports: [
		BrowserModule,
		HUDModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
