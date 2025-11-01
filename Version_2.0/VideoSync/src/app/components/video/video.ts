import { HttpClient } from '@angular/common/http';
import { Component, effect, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { StateService } from '../../services/state-service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-video',
	imports: [],
	templateUrl: './video.html',
	styleUrl: './video.scss',
})
export class Video {
	@ViewChild('videoClient') videoRef!: ElementRef<HTMLVideoElement>;
	private video!: HTMLVideoElement;
	showPlay = signal<boolean>(true);
	videoLoaded = signal<boolean>(false);

	constructor(public stateService: StateService, private router: Router) {
	}

	ngAfterViewInit() {
		this.video = this.videoRef.nativeElement;
		this.videoLoaded.set(true);
	}

	@HostListener('window:keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		event.preventDefault();
		if (this.videoLoaded()) {
			if (event.key === 'XF86Back') {
				this.router.navigate(['/']);
			}
			else if (event.key === 'Enter') {
				this.showPlay() ? this.video.play() : this.video.pause();
			}
			else if (event.key === 'ArrowRight') {
				this.video.pause();
				this.video.currentTime = Math.min(this.video.currentTime + 10, this.video.duration);
			}
			else if (event.key === 'ArrowLeft') {
				this.video.pause();
				this.video.currentTime = Math.max(this.video.currentTime - 10, 0);
			}
		}
	}

	formatTime(seconds: number): string {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);
		const pad = (v: number) => (v < 10 ? '0' + v : v);
		return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(secs)}` : `${mins}:${pad(secs)}`;
	}


}
