import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	currentUser:string;
	ad:boolean;
  uid:string[]=['hT2JRuUpxTbc5lS1Q3ig9J2Deze2',
  'GFTt4EJ9dxXEXC1VFeKjqBnnsE02',
  'tPk7fgs2TucAYTQUOgAd05UabUb2'
  ];
	afAuth:AngularFireAuth;

  constructor(public auth: AngularFireAuth, ) {
	  this.afAuth=this.auth;
  }
  login () {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  	if(this.afAuth.auth.currentUser!= null)this.currentUser=this.afAuth.auth.currentUser.uid;
  }
  logout(){
    this.afAuth.auth.signOut();
	  this.currentUser="";
  }
  ngOnInit() {
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
}
