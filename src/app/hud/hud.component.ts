import { Component, OnInit } from '@angular/core';
import { Resource } from 'src/interfaces/resource';
import { GameCtrlService } from '../game-ctrl.service';

@Component({
	selector: 'rts-hud',
	templateUrl: './hud.component.html',
	styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {
	resources:Resource[]=[];
	constructor(
		public ctrl:GameCtrlService
	){
		this.ctrl.ResourceUpdate.subscribe((res:any[])=>{
			for(var k=0; k<res.length; ++k){
				this.resources[k] = res[k] as Resource;
			}
		});
	}

	ngOnInit() {
	}

}
