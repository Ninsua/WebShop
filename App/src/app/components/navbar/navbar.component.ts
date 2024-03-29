import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { SigninService } from './../../services/signin/signin.service';
import { BasketService } from './../../services/basket/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
	signinService:SigninService;
	
	afAuth:AngularFireAuth;

	bQ:number=9000;

	constructor(public auth: AngularFireAuth, private signIn:SigninService,private basket:BasketService) {
	  this.afAuth=auth;
	  this.signinService=signIn;
	}
	
	login () {
		this.signinService.signIn();
		this.afAuth=this.signinService.getAfAuth();
	}

	logout(){
		this.signinService.signOut();
	}
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}

	basketQuantity():number {
		return this.basket.getTotalQuantity();
	}
	
 	ngOnInit() {
 	}

}