import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AdminPanelComponent } from './../components/admin-panel/admin-panel.component';
import { AddCategoryComponent } from './../components/add-category/add-category.component';
import { AddProductComponent } from './../components/add-product/add-product.component';
import { AdminEditProductComponent } from './../components/admin-edit-product/admin-edit-product.component';
import { AdminViewProductComponent } from './../components/admin-view-product/admin-view-product.component';
import { ShoppingCartComponent } from './../components/shopping-cart/shopping-cart.component';
import { ProductPageComponent } from '../components/product-page/product-page.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { AboutComponent } from '../components/about/about.component';
import { HomeComponent } from '../components/home/home.component';
import { CheckOutComponent} from '../components/check-out/check-out.component';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';
import { OrderListComponent } from '../components/order-list/order-list.component';

const routes: Routes = [
	//{ path: '', redirectTo: '/admin', pathMatch: 'full' }, //"Home" can be changed later
	{ path: 'admin', component: AdminPanelComponent },
	{ path: 'admin/add_category', component: AddCategoryComponent },
	{ path: 'admin/add_product', component: AddProductComponent },
	{ path: 'admin/edit_product', component: AdminViewProductComponent },
	{ path: 'admin/edit_product/:key', component: AdminEditProductComponent },
	{ path: 'shoppingcart', component: ShoppingCartComponent },
	{ path: 'products', component: ProductPageComponent },
	{ path: 'product/:key', component: ProductDetailsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'checkout', component: CheckOutComponent },
	{ path: 'admin/orderlist', component: OrderListComponent },
	{ path: 'admin/order-detail/:key', component: OrderDetailComponent },

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
