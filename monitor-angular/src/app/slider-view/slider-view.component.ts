import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'

@Component({
	selector: 'app-slider-view',
	standalone: true,
	imports: [],
	templateUrl: './slider-view.component.html',
	styleUrl: './slider-view.component.scss'
})
export class SliderViewComponent implements AfterViewInit {
	resizeAccumulator: number
	@ViewChild('slider') slider: ElementRef<HTMLInputElement> | undefined
	@ViewChild('resizer') resizer: ElementRef<HTMLInputElement> | undefined

	constructor() {
		this.resizeAccumulator = 0
	}

	ngAfterViewInit() {
		// это было на скорую руку, а так вообще осуждаю)
		let that = this

		function resize(event: MouseEvent) {
			requestAnimationFrame(() => {
				that.resizeAccumulator += event.movementX
				that.slider?.nativeElement.style.setProperty("--resize-delta", `${that.resizeAccumulator}px`)
			})
		}

		this.resizer?.nativeElement.addEventListener("mousedown", () => {
			this.slider?.nativeElement.addEventListener("mousemove", resize)
			this.slider?.nativeElement.addEventListener("mouseup", () => {
				this.slider?.nativeElement.removeEventListener("mousemove", resize)
			})
			this.slider?.nativeElement.addEventListener("mouseleave", () => {
				this.slider?.nativeElement.removeEventListener("mousemove", resize)
			})
		})
	}
}
