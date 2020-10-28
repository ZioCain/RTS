import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/interfaces/resource';

@Component({
	selector: 'rts-hud',
	templateUrl: './hud.component.html',
	styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {
	resources:Resource[]=[];
	constructor() { }

	ngOnInit() {
	}

}
