import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-popup',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './popup.component.html',
	styleUrl: './popup.component.scss'
})
export class PopupComponent {
	isOpen: boolean = false
	fields: String[] = []
	cellInfo: {
		name: String,
		editable: boolean,
		type: String | undefined
	}[] = []
	index: number = NaN
	editMode: boolean = false
	today: String = ""
	now: String = ""

	@Output() save = new EventEmitter();
	@ViewChildren('input') inputs: QueryList<ElementRef<HTMLInputElement>> | undefined

	constructor() {
		let date = new Date()
		this.today = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`
		this.now = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
		console.log(this.today, this.now)

	}

	open(
		data: String[],
		cellInfo: {
			name: String,
			editable: boolean,
			type: String | undefined
		}[],
		index: number,
		editMode: boolean
	) {
		this.isOpen = true
		this.fields = data
		this.cellInfo = cellInfo
		this.index = index
		this.editMode = editMode
	}

	close() {
		this.isOpen = false
	}

	saveData() {
		this.close()
		this.save.emit({
			data: this.inputs?.map(input => input.nativeElement.value),
			index: this.index
		})
	}

	getDefaultValue(type: String | undefined) {
		// не разобрался почему вызов этого метода приводит к ошибке, так вроде все работает 
		return type == 'date' ? this.today : type == 'time' ? this.now : (Math.random() * 5).toFixed(2)
	}
}
