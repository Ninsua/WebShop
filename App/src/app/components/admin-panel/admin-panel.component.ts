import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
	currentUser:string;
	ad:boolean;
	uid:string='hT2JRuUpxTbc5lS1Q3ig9J2Deze2';

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
	  this.currentUser=afAuth.auth.currentUser.uid;
	  console.log(this.currentUser);
  }

  isAdmin():boolean {
	console.log("isAdmin is run");
    return this.ad;
  }
  
  ngOnInit() {	  
	if (this.currentUser == this.uid) {
		this.ad = true;
	} else {
	this.ad == false;
	}
  }

}
