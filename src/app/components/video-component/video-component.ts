import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { Ws } from '../../services/ws';
import { StateService } from '../../services/state-service';

@Component({
	selector: 'app-video-component',
	imports: [],
	templateUrl: './video-component.html',
	styleUrl: './video-component.scss'
})
export class VideoComponent {
	@ViewChild('videoClient') videoRef!: ElementRef<HTMLVideoElement>;
	private video!: HTMLVideoElement;
	currentTime = signal<number>(0);
	duration = signal<number>(0);
	showPlay = signal<boolean>(true);
	counta= signal<number>(0);

	constructor(private ws: Ws, public stateService: StateService) {
		this.ws.connect(window.location.hostname);
		effect(() => {
			const msg = this.ws.lastMessage();
			if (msg) this.handleRemoteCommand(msg);
		});
	}

	ngAfterViewInit() {
		this.video = this.videoRef.nativeElement;
	}

	updatecountA(){
		this.counta.update(a=>a+1);
	}

	handleRemoteCommand(message: string) {
		const { action, data } = JSON.parse(message);
		switch (action) {
			case 'play':
				this.video.play();
				break;
			case 'pause':
				this.video.pause();
				break;
			case 'seek':
				this.video.currentTime = data;
				break;
			case 'select':
				this.stateService.selected_ind.set(data);
				break;
		}
	}
}
