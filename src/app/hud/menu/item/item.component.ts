// Menu item to show (upgrades, make unit, buildings, ...)
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/interfaces/item';

@Component({
	selector: 'rts-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent{
	@Input() item:Item;
	@Output() clicked:EventEmitter<string> = new EventEmitter();
	constructor(){}
	SendAction(){
		this.clicked.emit(this.item.action);
	}
}
