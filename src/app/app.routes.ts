import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home').then((mod) => mod.Home),
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile').then((mod) => mod.Profile)
            }
        ]

    },
    {
        path: "styleguide",
        children: [
            {
                path: "",
                loadComponent: () => import('./pages/styleguide/styleguide').then((mod) => mod.Styleguide)
            },
            {
                path: "typography",
                loadComponent: () => import('./pages/styleguide/typography/typography').then((mod) => mod.Typography)
            },
            {
                path: "colours",
                loadComponent: () => import('./pages/styleguide/colours/colours').then((mod) => mod.Colours)
            },
            {
                path: "buttons",
                loadComponent: () => import('./pages/styleguide/buttons/buttons').then((mod) => mod.Buttons)
            },
            {
                path: "icons",
                loadComponent: () => import('./pages/styleguide/icons/icons').then((mod) => mod.Icons)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/error/error').then((mod) => mod.Error),
    }
];
