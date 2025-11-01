import { Component, effect, ElementRef, HostListener, QueryList, signal, Signal, ViewChildren } from '@angular/core';
import { StateService } from '../../services/state-service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [NgClass],
	templateUrl: './home.html',
	styleUrl: './home.scss',
})
export class Home {
	@ViewChildren('episodeCard') episodeCards!: QueryList<ElementRef<HTMLImageElement>>;

	constructor(public stateService: StateService, private router: Router) {
	}

	@HostListener('window:keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		event.preventDefault();
		if (event.key === 'ArrowRight') {
			this.stateService.movies_ind.update(ind => Math.min(ind + 1, this.stateService.movies_list().length - 1));
			this.scrollIntoView();
		}
		else if (event.key === 'ArrowLeft') {
			this.stateService.movies_ind.update(ind => Math.max(ind - 1, 0));
			this.scrollIntoView();
		}
		else if (event.key === 'ArrowDown') {
			this.stateService.movies_ind.update(ind => Math.min(ind + 3, this.stateService.movies_list().length - 1));
			this.scrollIntoView();
		}
		else if (event.key === 'ArrowUp') {
			this.stateService.movies_ind.update(ind => Math.max(ind - 3, 0));
			this.scrollIntoView();
		}
		else if (event.key === 'Enter') {
			this.router.navigate(['/video']);
		}
	}

	private scrollIntoView() {
		const card = this.episodeCards.get(this.stateService.movies_ind());
		if (!card) return;

		const el = card.nativeElement;
		const rect = el.getBoundingClientRect();

		const isInView =
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth);

		if (!isInView) {
			el.scrollIntoView({
				behavior: 'auto',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

}
