// lower menu from where to pick units, reserches and such
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/interfaces/item';
import { Tile } from 'src/interfaces/tile';
import { GameCtrlService } from "src/app/game-ctrl.service";
import { Resource } from 'src/interfaces/resource';

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
			if(sel===null){
				this.items.length = 0;
				this.info = "";
				return;
			}
			console.log(sel);
			switch(sel.type){
				case 'tile': // show creation menu
					this.SelectedTile(sel.object as Tile);
					break;
			}
		});
	}
	HandleAction(action:string){
		this.game.DoAction(action);
	}
	MouseOverItem(item){
		var args:string[] = item.action.split(' ');
		var cmd = args.splice(0,1)[0];
		var res:Resource[] = this.game.NeededResources(cmd, args);
		var html = "";
		for(var k=0; k<res.length; ++k){
			html += "<h5>"+res[k].amount+" of "+res[k].name+"</h5>";
		}
		this.info = html;
	}
	SelectedTile(tile:Tile){
		switch(tile.occupied){
			case '': // tile is free => build
				this.items = [
					new Item('Build farm', 'build farm', 'assets/icons/farm.png'),
					new Item('Build lumber camp', 'build lumber-camp', 'assets/icons/lumber camp.png'),
					new Item('Build market', 'build market', 'assets/icons/market.png'),
					new Item('Build barracks', 'build barracks', 'assets/icons/barracks.png')
				];
				break;
			case 'farm': this.info = '<h1>Farm</h1><h5>This farm will produce 1 food every 10s</h5>'; break;
			case 'lumber-camp': this.info = '<h1>Lumber camp</h1><h5>This lumber camp will produce 1 wood every 10s</h5>'; break;
			case 'market':
				this.info = '<h1>Market</h1><h5>Market will allow you to buy and sell resources</h5>';
				this.items=[
					new Item('Buy food', 'buy Food 10', ''),
					new Item('Buy wood', 'buy Wood 10', ''),
					new Item('Buy stone', 'buy Stone 10', ''),
					new Item('Sell food', 'sell Food 10', ''),
					new Item('Sell wood', 'sell Wood 10', ''),
					new Item('Sell stone', 'sell Stone 10', ''),
				];
				break;
			case 'barracks':
				this.info = '<h1>Barracks</h1><h5>Use the barracks to create units</h5>';
				this.items=[
					new Item(
						'Make militia',
						'make militia 5 '+(tile.x+1)+' '+tile.y+' assets/icons/militia.png',
						'assets/icons/militia.png'
					)
				];
				break;
		}
	}
}
