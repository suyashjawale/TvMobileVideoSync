import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Ws } from '../../services/ws';
import { StateService } from '../../services/state-service';

@Component({
	selector: 'app-home-page',
	imports: [],
	templateUrl: './home-page.html',
	styleUrl: './home-page.scss'
})
export class HomePage {
	@ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
	private video!: HTMLVideoElement;
	paused = signal<boolean>(true);
	greenScreen = signal<boolean>(false);

	constructor(private ws: Ws, public stateService: StateService) {
		this.ws.connect(window.location.hostname);
	}

	ngAfterViewInit() {
		this.video = this.videoRef.nativeElement;
		this.video.addEventListener('play', () => this.sendCommand('play'));
		this.video.addEventListener('pause', () => this.sendCommand('pause'));
		this.video.addEventListener('seeked', () =>
			this.sendCommand('seek', this.video.currentTime)
		);
	}

	sendCommand(action: string, data?: any) {
		this.ws.send({ action, data });
	}

	launchVideo(ind: number) {
		this.stateService.selected_ind.set(ind);
		this.ws.send({ action: 'select', data: ind });
	}

	goFullScreen() {
		const element: any = document.documentElement;

		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) { // Firefox
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) { // IE/Edge
			element.msRequestFullscreen();
		}
	}

	exitFullScreen() {
		const element: any = document.documentElement;
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if ((document as any).mozCancelFullScreen) { // Firefox
			(document as any).mozCancelFullScreen();
		} else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
			(document as any).webkitExitFullscreen();
		} else if ((document as any).msExitFullscreen) { // IE/Edge
			(document as any).msExitFullscreen();
		}
	}

}
