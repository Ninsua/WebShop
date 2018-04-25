import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AdminPanelComponent } from './../components/admin-panel/admin-panel.component';

const routes: Routes = [
	//{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //"Home" can be changed later
	{ path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  imports: [
	RouterModule.forRoot(routes)
  ],
 	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
