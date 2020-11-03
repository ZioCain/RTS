export class Resource{
	name:string="";
	icon:string="";
	amount:number=0;
	constructor(nm:string, amnt:number, icn:string=''){
		this.name = nm;
		this.amount = amnt;
		this.icon = icn;
	}
}
