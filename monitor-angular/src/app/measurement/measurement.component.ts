import { Component, ViewChild } from '@angular/core'
import { TableComponent } from '../table/table.component'

@Component({
	selector: 'app-measurement',
	standalone: true,
	imports: [TableComponent],
	templateUrl: './measurement.component.html',
	styleUrl: './measurement.component.scss'
})

export class MeasurementComponent {
	@ViewChild(TableComponent) table: TableComponent | undefined

	remove() {
		if (confirm("Удалить выбранные элементы?")) {
			this.table?.removeItems()
		}
	}

	edit() {
		this.table?.edit(true)
	}
}