import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Error } from './pages/error/error';

export const routes: Routes = [
    {
        path: '',
        component: Home,

    }, {
        path: 'error',
        component: Error,
    }
];
