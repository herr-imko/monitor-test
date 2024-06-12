import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from "./header/header.component"
import { FooterComponent } from "./footer/footer.component"
import { EquipmentComponent } from "./equipment/equipment.component"
import { SliderViewComponent } from "./slider-view/slider-view.component"
import { MeasurementComponent } from "./measurement/measurement.component"

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, SliderViewComponent, EquipmentComponent, MeasurementComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})

export class AppComponent {
	title = 'monitor-angular';
	constructor() {
	}
}
