import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChild, ViewChildren, afterRender, afterNextRender, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FakedataService } from '../fakedata.service'
import { PopupComponent } from '../popup/popup.component'

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [CommonModule, PopupComponent],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})

export class TableComponent implements AfterViewInit {
	hasCheck: boolean = true
	canAdd: boolean = true
	fakedataService: FakedataService = inject(FakedataService)
	data: String[][] = []
	theads: {
		name: String,
		editable: boolean,
		type: String | undefined
	}[] = []

	@ViewChild('checkAll') checkAll: ElementRef<HTMLInputElement> | undefined
	@ViewChild('root') root: ElementRef<HTMLInputElement> | undefined
	@ViewChild(PopupComponent) popup: PopupComponent | undefined
	@ViewChildren('check') check: QueryList<ElementRef<HTMLInputElement>> | undefined

	@Input() extraClass: String = ""

	constructor() {
		this.fakedataService.getTable().then(data => {
			this.data = data.data
			this.theads = data.keys
		})

		afterRender(() => {
			this.check?.forEach(checkbox => {
				checkbox.nativeElement.addEventListener("change", () => {
					if (this.root && this.checkAll) {
						this.checkAll.nativeElement.checked = this.root.nativeElement.matches(':not(:has(tbody input:not(:checked)))')
					}
				})
			})
		})
	}

	ngAfterViewInit() {
		this.checkAll?.nativeElement.addEventListener("change", () => {
			this.check?.forEach(checkbox => {
				if (this.checkAll) {
					checkbox.nativeElement.checked = this.checkAll.nativeElement.checked
				}
			})
		})
	}

	removeItems() {
		let toRemove = this.check?.toArray().map((checkbox, i) => {
			return checkbox.nativeElement.checked ? i : NaN
		}).filter((value) => !isNaN(value))

		this.data = this.data.filter(function (value, index) {
			return toRemove?.indexOf(index) == -1
		})
	}

	save(data: {
		data: String[],
		index: number
	}) {
		if (data.index < 0) {
			// как будто отправили запрос на добавление данных
			this.fakeFetch()
				.then(status => {
					if (status) {
						this.data.push(data.data)
					}
				})
				.catch(error => {
					alert("Не удалось обновить данные")
				})
		} else {
			// как будто отправили запрос на добавление данных
			this.fakeFetch()
				.then(status => {
					if (status) {
						this.data[data.index] = data.data
					}
				})
				.catch(error => {
					alert("Не удалось обновить данные")
				})
		}
	}

	async fakeFetch() {
		return fetch('https://run.mocky.io/v3/33fd4463-e62d-4053-99df-6d045e1d764d')
			.then(response => true)
	}

	edit(editMode: boolean) {
		if (editMode) {
			this.check?.toArray().forEach((checkbox, index) => {
				if (checkbox.nativeElement.checked) {
					this.popup?.open(this.data[index], this.theads, index, editMode)
				}
			})
		} else {
			this.popup?.open([], this.theads, -1, editMode)
		}
	}
}
