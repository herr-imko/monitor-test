import Cleave from "cleave.js"
import 'cleave.js/dist/addons/cleave-phone.ru'
import "fslightbox"
import { Splide } from "@splidejs/splide"
import Dropzone from "./_Dropzone"
import InputContollerGroup from "./_InputControllerGroup"
import Popup from "./_Popup"
import Quantity from "./_Quantity"
import Animate from "./_Animate"
import SyncedInputs from "./_SyncedInputs"
import { breakpoints, headerHeightToCSS } from "./_helpers"

document.addEventListener('DOMContentLoaded', function () {
	// headerHeightToCSS()
	// Popup.initPopups()
	// initTabs()
	// initPhoneMask()
	// initQuantity()
	// initInputControllerGroups()
	// initSyncedInputs()
	// initDropzone()
	// initAnimates()
	initResize()
	initCheckAll()
	initTabs()
})

function initTabs() {
	document.querySelectorAll(".tabs").forEach(tabs => {
		let controls = tabs.querySelectorAll(".tabs__control")
		let contents = tabs.querySelectorAll(".tabs__content")
		controls.forEach((control, index) => {
			control.addEventListener("click", () => {
				controls.forEach((control, jndex) => {
					control.classList.toggle("is-active", index == jndex)
				})
				contents.forEach((content, jndex) => {
					content.classList.toggle("is-active", index == jndex)
				})
			})
		})
	})
}

function initCheckAll() {
	document.querySelectorAll("table").forEach(table => {
		let headCheckbox = table.querySelector("thead input[type=checkbox]")
		let bodyCheckboxex = table.querySelectorAll("tbody input[type=checkbox]")

		bodyCheckboxex.forEach(checkbox => {
			checkbox.addEventListener("change", () => {
				headCheckbox.checked = table.matches(':not(:has(tbody input:not(:checked)))')
			})
		})
		headCheckbox?.addEventListener("change", () => {
			bodyCheckboxex.forEach(checkbox => {
				checkbox.checked = headCheckbox.checked
			})
		})
	})
}

function initResize() {
	document.querySelectorAll(".slider-view").forEach(slider => {
		let resizeAccumulator = 0
		/**
		 * 
		 * @param {DragEvent} event 
		 */
		function resize(event) {
			// уменьшает количество рефлоу и репеинт почти вдвое
			requestAnimationFrame(() => {
				resizeAccumulator += event.movementX
				slider.style.setProperty("--resize-delta", `${resizeAccumulator}px`)
			})
		}
		slider.querySelector(".slider-view__resizer").addEventListener("mousedown", function () {
			slider.addEventListener("mousemove", resize)
			slider.addEventListener("mouseup", () => {
				slider.removeEventListener("mousemove", resize)
			})
			slider.addEventListener("mouseleave", () => {
				slider.removeEventListener("mousemove", resize)
			})
		})
	})
}

function initSyncedInputs() {
	SyncedInputs.findGroups().forEach(group => {
		new SyncedInputs(...group)
	})
}

function initDropzone() {
	window.dropzones = []
	document.querySelectorAll(".dropzone").forEach(dropzone => {
		new Dropzone(dropzone)
	})
}

function initAnimates() {
	window.animates = [...document.querySelectorAll("[data-animate-group]")].map(group => new Animate(group))
}

function initQuantity() {
	document.querySelectorAll(".quantity").forEach(item => {
		new Quantity(item)
	})
}

function initInputControllerGroups() {
	InputContollerGroup.findGroups().forEach(group => {
		new InputContollerGroup(group)
	})
}

function initPhoneMask() {
	document.querySelectorAll('input[type=tel]').forEach(input => {
		new Cleave(input, {
			phone: true,
			phoneRegionCode: "RU",
			delimiter: "-",
			prefix: "+7",
			noImmediatePrefix: true
		})
	})
}
