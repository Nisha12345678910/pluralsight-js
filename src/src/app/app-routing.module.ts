import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { ClientInfoViewComponent } from './clientInfo-ui/client-info-view/client-info-view.component';
import { ClientInfoListViewComponent } from './clientInfo-ui/client-info-list-view/client-info-list-view.component';
import { ClientInfoEditComponent } from './clientInfo-ui/client-info-edit/client-info-edit.component';
import { ClientInfoCreateComponent } from './clientInfo-ui/client-info-create/client-info-create.component';
const routes: Routes = [
   { path: 'client-info', component: ClientInfoListViewComponent  },
  { path: 'client-info/create', component: ClientInfoCreateComponent },
  { path: 'client-info/edit/:id', component: ClientInfoEditComponent },
  { path: 'client-info/view/:id', component: ClientInfoViewComponent },
  { path: '', redirectTo: '/client-info', pathMatch: 'full' }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
