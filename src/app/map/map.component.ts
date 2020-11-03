// will show the map of current development
import { Component, OnInit } from '@angular/core';
import { Tile } from "src/interfaces/tile";
import { GameCtrlService } from "src/app/game-ctrl.service";

@Component({
	selector: 'rts-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	readonly WIDTH=50;
	readonly HEIGHT=50;
	readonly TILE_WIDTH = 20;
	readonly TILE_HEIGHT = 20;

	tiles:any[]=[];
	constructor(
		public game:GameCtrlService
	){}
	ngOnInit(){
		for(var x=0; x<this.WIDTH; ++x)
			for(var y=0; y<this.HEIGHT; ++y)
				this.tiles.push(new Tile(x*this.TILE_WIDTH, y*this.TILE_HEIGHT, 0));
		this.game.MapUpdate.subscribe((tile:Tile)=>{
			if(tile===null) return;
			var index = this.tiles.findIndex((t:Tile)=>t.x === tile.x && t.y===tile.y);
			if(index<0) return;
			this.tiles[index] = tile;
		});
	}
	LeftClick(tile:Tile){
		var old = this.game.GetSelection();
		if(old!==null){
			old.object.selected = false;
			if((old.object as Tile).x === tile.x && (old.object as Tile).y === tile.y){
				this.game.SetSelection(null);
				return;
			}
		}
		tile.selected = true;
		this.game.SetSelection({
			type: "tile",
			object: tile
		})
	}
	RightClick(tile, e){
		e.preventDefault();
		var selection = this.game.GetSelection();
		if(selection.type === 'unit'){
			// move units to this point
		}
	}
}
