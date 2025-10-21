import { Routes } from '@angular/router';
import { VideoComponent } from './components/video-component/video-component';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
    {
        path:'',
        component:HomePage
    },
    {
        path: 'video', 
        component:VideoComponent
    },
];
