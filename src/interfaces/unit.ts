export class Unit{
	name:string="";
	x:number=0;
	y:number=0;
	amount:number=0;
	image:string='';
	destination:{x:number,y:number}={x:0,y:0};
	speed:number=1;
	constructor(name:string,amount:number,x:number,y:number,image:string){
		this.name = name;
		this.amount = amount;
		this.x = x;
		this.y = y;
		this.image = image;
		this.destination.x = this.x;
		this.destination.y = this.y;
	}
	public Update(){
		if(this.x!==this.destination.x || this.y!==this.destination.y){
			if(Math.abs(this.destination.x-this.x)>Math.abs(this.destination.y-this.y)){
				this.x += this.destination.x>this.x?this.speed:-this.speed;
			}else{
				this.y += this.destination.y>this.y?this.speed:-this.speed;
			}
		}
	}
}
