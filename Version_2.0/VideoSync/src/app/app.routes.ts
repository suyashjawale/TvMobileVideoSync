import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Video } from './components/video/video';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'video',
        component: Video
    },
];
