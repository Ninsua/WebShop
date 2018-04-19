import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [ NavbarComponent]
})
export class AppModule { }
