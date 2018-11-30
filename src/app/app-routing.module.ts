import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './common/login.component';
import { MainComponent } from './common/main.component';

const routes: Routes = [
  { 
    path : '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {title: '로그인'}
  // },
  {
    path : 'main',
    component : MainComponent,
    data: {title: '메인'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [
  //LoginComponent, 
  MainComponent]
