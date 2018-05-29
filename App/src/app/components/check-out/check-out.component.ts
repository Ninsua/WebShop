import { Component, OnInit } from '@angular/core';
import { BasketService } from './../../services/basket/basket.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product, Order, Address } from '../../classes/classes';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
	selector: 'app-check-out',
	templateUrl: './check-out.component.html',
	styleUrls: ['./check-out.component.css'],
	providers: [BasketService]
})
export class CheckOutComponent implements OnInit {
	itemListStr:string;
	quantityListStr:string;

	paymentMethod:string;

	user:string = "no user";

	street:string;
	zipCode:string;
	city:string;
	country:string;

	orderKey:string;



	orderRef:AngularFireList<Order>;

	constructor(private cookie:CookieService, private basket:BasketService, private db: AngularFireDatabase,private location: Location) {
		this.orderRef = db.list('/Orders');
		this.itemListStr = cookie.get('items');
		this.quantityListStr = cookie.get('quantity');
		
	}

	onKeyStreet(value:string){
		this.street = value
	}

	onKeyZipCode(value:string){
		this.zipCode = value;
	}

	onKeyCity (value:string){
		this.city = value;
	}

	onKeyCountry(value:string){
		this.country = value;
	}

	confirm(){
	
		let addr = new Address(this.street, this.zipCode, this.city, this.country);
		let order = new Order(this.user, addr,  false, false, this.itemListStr, this.quantityListStr);

		this.orderRef.push(order);

		alert('Order has been sent!');

		this.cookie.deleteAll();
		this.goBack();
	}

	ngOnInit() {
		
	}
	
	

	checkOut(){
		
	}

	goBack(): void {
		this.location.back();
	}

}