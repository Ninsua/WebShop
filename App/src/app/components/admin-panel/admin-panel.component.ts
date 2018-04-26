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
  uid:string[]=['hT2JRuUpxTbc5lS1Q3ig9J2Deze2',
  'GFTt4EJ9dxXEXC1VFeKjqBnnsE02',
  'tPk7fgs2TucAYTQUOgAd05UabUb2'
  ];
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
	  this.currentUser=afAuth.auth.currentUser.uid;
	  console.log(this.currentUser);
  }
	isAdmin():boolean {
    if(this.afAuth.auth.currentUser!= null){
      this.currentUser=this.afAuth.auth.currentUser.uid;
      this.ad = false;
      for(var i = 0; i<3;i++)
      {
        if (this.currentUser == this.uid[i]) this.ad = true;
      }
    	return this.ad;
    }
  }
  ngOnInit() {
  }

}
