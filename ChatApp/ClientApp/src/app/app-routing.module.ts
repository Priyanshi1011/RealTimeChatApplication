import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: WelcomeComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: HomeComponent
  },
  {
    path: 'profile/:name',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
        pathMatch: 'full',
      },
      
      {
        path: ':name/:Id',
        component: ChatPageComponent,
        pathMatch: 'full',
      }
    ]

  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
