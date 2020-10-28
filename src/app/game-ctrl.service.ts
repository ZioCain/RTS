import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GameCtrlService {
	// events
	public SelectionChange:BehaviorSubject<any> = new BehaviorSubject(null);
	// variables
	private selection:any=null;
	constructor(){}
	// methods
	public GetSelection():any{return this.selection;}
	public SetSelection(sel:any):void{
		this.selection = sel;
		this.SelectionChange.next(this.selection);
	}
}
