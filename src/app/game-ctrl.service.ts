// main controller service, will hold the status of the whole game
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Resource } from 'src/interfaces/resource';
import { Tile } from 'src/interfaces/tile';
import { Unit } from 'src/interfaces/unit';

@Injectable({
	providedIn: 'root'
})
export class GameCtrlService {
	// events
	public SelectionChange:BehaviorSubject<any> = new BehaviorSubject(null);
	public ResourceUpdate:BehaviorSubject<any> = new BehaviorSubject(null);
	public MapUpdate:BehaviorSubject<any> = new BehaviorSubject(null);
	// variables
	private selection:any=null;
	private resources:Resource[]=[];
	private production:Resource[]=[];
	private units:Unit[]=[];
	constructor(){
		this.resources.push(
			new Resource('Food', 100),
			new Resource('Wood', 100),
			new Resource('Gold', 100),
			new Resource('Stone', 100),
		);
		this.production = [
			new Resource('Food', 0),
			new Resource('Wood', 0),
			new Resource('Gold', 0),
			new Resource('Stone', 0),
		];
		this.ResourceUpdate.next(this.resources);
		// update resources every 10 seconds
		setInterval(this.UpdateResources.bind(this), 10000);
		setInterval(this.UpdateUnits.bind(this), 1000);
	}
	// methods
	public GetSelection():any{return this.selection;}
	public SetSelection(sel:any):void{
		this.selection = sel;
		this.SelectionChange.next(this.selection);
	}
	public IncreaseResource(name:string, amount:number){
		var index = this.resources.findIndex((item)=>item.name===name);
		if(index<0) return;
		this.resources[index].amount += amount;
		this.ResourceUpdate.next(this.resources);
	}
	public DecreaseResource(name:string, amount:number){this.IncreaseResource(name, -amount);}
	public DecreaseResources(res:Resource[]){
		for(var k=0; k<res.length; ++k){
			this.DecreaseResource(res[k].name, res[k].amount);
		}
	}
	public DoAction(action:string){
		var args:string[] = action.split(' ');
		var cmd = args.splice(0,1)[0];
		switch(cmd){
			case 'build':
				// not a tile
				if(this.selection.type!=='tile') return;
				var tile:Tile = (this.selection.object as Tile);
				// tile is already build/occupied
				if(tile.occupied!=='') return;
				var res:Resource[] = this.NeededResources(cmd, args);
				if( !this.HasResources(res) ) return;
				this.DecreaseResources(res);
				tile.occupied = args[0];
				switch(args[0]){
					case 'farm': this.production[0].amount+=1; tile.image='assets/icons/farm.png'; break;
					case 'lumber-camp': this.production[1].amount+=1; tile.image='assets/icons/lumber camp.png'; break;
					case 'market': tile.image='assets/icons/market.png'; break;
					case 'barracks': tile.image='assets/icons/barracks.png'; break;
				}
				tile.fogLevel = 0;
				this.MapUpdate.next(this.selection.object);
				this.SetSelection({
					type: 'building',
					object: {
						name: args[0],
						x: tile.x,
						y: tile.y,
					}
				})
				break;
			case 'make':
				this.MakeUnit(new Unit(args[0], +args[1], +args[2], +args[3], args[4]));
				break;
			case 'buy':
			case 'sell':
				this.Market(cmd, new Resource(args[0],+args[1]));
				break;
			default:
				console.log("Unknown action");
		}
	}
	public MakeUnit(unit:Unit){
		var res = this.NeededResources( 'make', [unit.name] );
		if( !this.HasResources(res) ) return;
		this.DecreaseResources(res);
		this.units.push(unit);
	}
	private Market(transaction:string, res:Resource){
		if(transaction==='sell'){
			if(!this.HasResources([res])) return;
			this.DecreaseResource(res.name, res.amount);
			this.IncreaseResource('Gold', res.amount/2);
		}else{
			if(!this.HasResources([new Resource('Gold', res.amount*2)])) return;
			this.IncreaseResource(res.name, res.amount);
			this.DecreaseResource('Gold', res.amount*2);
		}
		this.ResourceUpdate.next(this.resources);
	}
	public NeededResources(command:string, arg:string[]){
		switch(command){
			case 'build':
				switch(arg[0]){
					case 'farm': return [new Resource('Wood', 25), new Resource('Stone', 25), new Resource('Gold',5)];
					case 'lumber-camp': return [new Resource('Wood', 50), new Resource('Stone', 25), new Resource('Gold', 5)];
					case 'market': return [new Resource('Wood', 100), new Resource('Stone', 25), new Resource('Gold', 25)];
					case 'barracks': return [new Resource('Wood', 100), new Resource('Stone', 25), new Resource('Gold', 25)];
				}
				break;
			case 'make':
				switch(arg[0]){
					case 'militia': return [new Resource('Food', 25), new Resource('Gold', 5)];
				}
				break;
		}
	}
	public HasResources(res:Resource[]){
		for(var k=0; k<res.length; ++k){
			switch(res[k].name){
				case 'Food': if(this.resources[0].amount<res[k].amount) return false;
				case 'Wood': if(this.resources[1].amount<res[k].amount) return false;
				case 'Gold': if(this.resources[2].amount<res[k].amount) return false;
				case 'Stone': if(this.resources[3].amount<res[k].amount) return false;
			}
		}
		return true;
	}
	private UpdateResources(){
		for(var k=0; k<this.resources.length; ++k){
			this.resources[k].amount += this.production[k].amount;
		}
		this.ResourceUpdate.next(this.resources);
	}
	private UpdateUnits(){
		for(var k=0; k<this.units.length; ++k){
			this.units[k].Update();
		}
	}
}
