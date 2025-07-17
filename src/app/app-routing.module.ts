import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { SignUpComponent } from './modules/auth/components/sign-up/sign-up.component';
import { SigninComponent } from './modules/auth/components/signin/signin.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NewEntryComponent } from './modules/journal/components/new-entry/new-entry.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
      { path: 'auth/signin', component: SigninComponent },
      { path: 'auth/signup', component: SignUpComponent },
    ]
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "", redirectTo: 'dashboard', pathMatch: 'full'
      }, {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'new',
        component: NewEntryComponent
      }
    ]
  }
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
