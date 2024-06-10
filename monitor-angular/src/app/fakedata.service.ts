import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class FakedataService {

	constructor() { }

	async getTable(): Promise<{
		keys: [{
			name: String,
			editable: boolean,
			type: String | undefined
		}], data: String[][]
	}> {
		return await fetch('https://run.mocky.io/v3/33fd4463-e62d-4053-99df-6d045e1d764d')
			.then(response => response.json())
	}
}
