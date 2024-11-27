import {Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch:"full", loadComponent:() => {return import ('./home/home.component').then(m => m.HomeComponent)} },
  { path: 'dashboard', pathMatch:"full", loadComponent:() => {return import ('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)} },
  { path: 'movie/:id', pathMatch:"full", loadComponent:() => {return import ('./layout/layout.component').then(m => m.LayoutComponent)} },
  { path: '**', redirectTo: '' }
];
