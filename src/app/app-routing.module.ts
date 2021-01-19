import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

import { HomeComponentComponent } from '../app/home-component.component';
import { PageNotFoundComponentComponent } from '../app/page-not-found-component.component'
import { CustomPreloadingService } from './custom-preloading.service';
import { LatestComponent} from '../app/latest/latest.component';

const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: 'latest', component: LatestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'employees',  loadChildren: () => import('src/app/employee/employee.module').then(m => m.EmployeeModule) },
  { path: '**', component: PageNotFoundComponentComponent }
];


@NgModule({  
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading})],
  exports: [RouterModule] 
})
export class AppRoutingModule { }  










   