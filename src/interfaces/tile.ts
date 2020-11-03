export class Tile{
	x:number=0;
	y:number=0;
	fogLevel:number=0;
	selected:boolean=false;
	occupied:string='';
	image:string='';
	constructor(xx:number,yy:number,fg:number){
		this.x = xx || 0;
		this.y = yy || 0;
		this.fogLevel = fg || 0;
		this.selected = false;
		this.occupied = '';
		this.image = '';
	}
}
