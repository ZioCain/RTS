export class Tile{
	x:number=0;
	y:number=0;
	fogLevel:number=0;
	constructor(xx,yy,fg){
		this.x = xx || 0;
		this.y = yy || 0;
		this.fogLevel = fg || 0;
	}
}
