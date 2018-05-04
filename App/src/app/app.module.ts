import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

//Firebase stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageModule} from 'angularfire2/storage';

//Routing
import { AppRoutingModule } from './routing/app-routing.module';

//Services
import { SigninService } from './services/signin/signin.service';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminViewProductComponent } from './components/admin-view-product/admin-view-product.component';
import { AdminEditProductComponent } from './components/admin-edit-product/admin-edit-product.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

@NgModule({

  declarations: [
	AppComponent,
    NavbarComponent,
    AdminPanelComponent,
	AddCategoryComponent,
	AddProductComponent,
	AdminViewProductComponent,
	AdminEditProductComponent,
	SearchbarComponent
  ],
	imports: [
    AngularFireModule.initializeApp(environment.firebase),
	AngularFireDatabaseModule,
	AngularFireStorageModule,
    BrowserModule,
	AppRoutingModule,
	FormsModule
  ],
  providers: [AngularFireAuth, SigninService],
  bootstrap: [AppComponent]
})
export class AppModule { }
