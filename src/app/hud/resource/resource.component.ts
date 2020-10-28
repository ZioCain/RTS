import { Component, OnInit, Input } from '@angular/core';

import { Resource } from "src/interfaces/resource";

@Component({
	selector: 'rts-resource',
	templateUrl: './resource.component.html',
	styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
	@Input() resource:Resource;
	constructor() { }

	ngOnInit() {
	}

}
