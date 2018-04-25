import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

//Routing
import { AppRoutingModule } from './routing/app-routing.module';

//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AdminPanelComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
	AppRoutingModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [NavbarComponent]
})
export class AppModule { }
