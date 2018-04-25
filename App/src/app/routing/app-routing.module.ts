import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AdminPanelComponent } from './../components/admin-panel/admin-panel.component';
import { AddCategoryComponent } from './../components/add-category/add-category.component';

const routes: Routes = [
	//{ path: '', redirectTo: '/admin', pathMatch: 'full' }, //"Home" can be changed later
	{ path: 'admin', component: AdminPanelComponent },
	{ path: 'admin/add_category', component: AddCategoryComponent }
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
