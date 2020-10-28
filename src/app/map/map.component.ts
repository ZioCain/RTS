import { Component, OnInit } from '@angular/core';
import { Tile } from "src/interfaces/tile";
import { GameCtrlService } from "src/app/game-ctrl.service";

@Component({
	selector: 'rts-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	readonly WIDTH=100;
	readonly HEIGHT=100;
	readonly TILE_WIDTH = 10;
	readonly TILE_HEIGHT = 10;

	tiles:any[]=[];
	constructor(
		public game:GameCtrlService
	){}
	ngOnInit(){
		for(var x=0; x<this.WIDTH; ++x)
			for(var y=0; y<this.HEIGHT; ++y)
				this.tiles.push(new Tile(x*this.TILE_WIDTH, y*this.TILE_HEIGHT, 0));
	}
	LeftClick(tile){
		this.game.SetSelection({
			type: "tile",
			object: tile
		})
	}
	RightClick(){
		this.game.GetSelection();
		console.log("right click");
	}
}
