import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class SigninService {
	
	afAuth:AngularFireAuth;
	adminsList:string[];//Observable<any[]>;
	
	currentUser:string;
	admin:boolean=false;

	constructor(public auth: AngularFireAuth,private db: AngularFireDatabase) {
 		this.afAuth = auth;
		this.db.list('/Admins/').valueChanges()
			.subscribe((ad:string[]) => this.adminsList = ad);
	}
	
	signIn() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
		if(this.afAuth.auth.currentUser != null) {
			this.currentUser=this.afAuth.auth.currentUser.uid;
		}
	}
	
	signOut() {
	    this.afAuth.auth.signOut();
		this.currentUser="";
	}
	
	getAfAuth():AngularFireAuth {
		return this.afAuth;
	}
	
	getCurrentUser() {
		return this.currentUser;
	}
	
	checkUser() {
		if(this.afAuth.auth.currentUser!= null) {
    		this.currentUser=this.afAuth.auth.currentUser.uid;
		} else {
			this.currentUser="";
		}
	}
	
	adminCheck() {
		if(this.afAuth.auth.currentUser != null) {
      		for(var i = 0; i < this.adminsList.length; i++) {
        		if (this.currentUser == this.adminsList[i]) {
					this.admin = true;
				}
			}
    	} else {
			this.admin = false;
		}
	}
	
	isAdmin():boolean {
		this.checkUser();
		this.adminCheck();
		return this.admin;
  }

}
