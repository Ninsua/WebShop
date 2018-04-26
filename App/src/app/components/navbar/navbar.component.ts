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
	uid:string='hT2JRuUpxTbc5lS1Q3ig9J2Deze2';
	afAuth:AngularFireAuth;

  constructor(public auth: AngularFireAuth, ) {
	  this.afAuth=this.auth;
  }
  login () {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	this.currentUser=this.afAuth.auth.currentUser.uid;
  }
  logout(){
    this.afAuth.auth.signOut();
	this.currentUser="";
  }
  ngOnInit() {
  }
	
	isAdmin():boolean {
		this.currentUser=this.afAuth.auth.currentUser.uid;
		console.log(this.currentUser);
		console.log(this.uid);
		if (this.currentUser == this.uid) {
			console.log("current user is uid");
			this.ad = true;
		} else {
			console.log("current user is not uid");
			this.ad == false;
		}
	return this.ad;
  }

}
