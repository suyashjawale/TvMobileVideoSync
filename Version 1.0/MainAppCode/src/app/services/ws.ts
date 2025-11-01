import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Ws {
	private ws!: WebSocket;
	lastMessage = signal<string | null>(null);

	connect(ip: string) {
		this.ws = new WebSocket(`ws://${ip}:8000/ws`);
		this.ws.onmessage = (event) => {
			this.lastMessage.set(event.data);
		};
	}

	send(data: any) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(data));
		}
	}
}
