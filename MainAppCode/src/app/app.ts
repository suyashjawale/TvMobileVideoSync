import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoComponent } from "./components/video-component/video-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
