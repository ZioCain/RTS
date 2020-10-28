import { Component, OnInit } from '@angular/core';
import { Item } from 'src/interfaces/item';
import { GameCtrlService } from "src/app/game-ctrl.service";

@Component({
	selector: 'rts-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	items:Item[]=[];
	info:string="";
	constructor(
		public game:GameCtrlService
	){}
	ngOnInit(){
		this.game.SelectionChange.subscribe((sel:any)=>{
			console.log(sel);
			this.info
		});
	}

}
