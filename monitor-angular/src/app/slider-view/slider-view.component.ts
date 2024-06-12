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
		let resize = (event: MouseEvent) => {
			requestAnimationFrame(() => {
				this.resizeAccumulator += event.movementX
				this.slider?.nativeElement.style.setProperty("--resize-delta", `${this.resizeAccumulator}px`)
			})
		}

		let stopResize = () => {
			this.slider?.nativeElement.removeEventListener("mousemove", resize)
			this.slider?.nativeElement.classList.remove("is-active")
		}

		this.resizer?.nativeElement.addEventListener("mousedown", () => {
			this.slider?.nativeElement.addEventListener("mousemove", resize)
			this.slider?.nativeElement.classList.add("is-active")
		})

		this.slider?.nativeElement.addEventListener("mouseup", stopResize)

		this.slider?.nativeElement.addEventListener("mouseleave", stopResize)
	}
}
