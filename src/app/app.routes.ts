import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './services/auth-guard';

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
            },
            {
                path: 'about',
                loadComponent: () => import('./pages/about/about').then((mod) => mod.About)
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
        path: 'auth',
        children: [
            {
                path: 'register',
                loadComponent: () => import('./pages/auth/register/register').then((mod) => mod.Register)
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login/login').then((mod) => mod.Login)
            }
        ]
    },
    {
        path: 'games',
        canActivate: [authGuard],
        component: MainLayout,
        children: [
            {
                path: 'hangman',
                loadComponent: () => import('./pages/games/hangman/hangman').then((mod) => mod.Hangman)
            },
            {
                path: 'trivia',
                loadComponent: () => import('./pages/games/trivia/trivia').then((mod) => mod.Trivia)
            },
            {
                path: 'greater-or-lower',
                loadComponent: () => import('./pages/games/greater-or-lower/greater-or-lower').then((mod) => mod.GreaterOrLower)
            },
            {
                path: 'fake-or-photo',
                loadComponent: () => import('./pages/games/fake-or-photo/fake-or-photo').then((mod) => mod.FakeOrPhoto)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/error/error').then((mod) => mod.Error),
    }
];
