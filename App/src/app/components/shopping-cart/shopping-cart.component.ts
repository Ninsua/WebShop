import { Component, OnInit } from '@angular/core';
import { BasketService } from './../../services/basket/basket.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../../classes/classes';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.css'],
	providers: [BasketService]
})
export class ShoppingCartComponent implements OnInit {
	itemsList:string[] = [];
	quantityList:number[] = [];
	productsList:Product[] = [];
	
	totalPrice:number=0;

	constructor(private basket:BasketService, private db: AngularFireDatabase,private location: Location) {
		
	}

	ngOnInit() {
		setTimeout(this.itemsList=this.basket.getItemsList(),200);
		setTimeout(this.quantityList=this.basket.getQuantityList(),220);
		setTimeout(this.getProducts(),240);
	}
	
	refreshQuantity(index:number) {
		if (this.quantityList[index] > this.productsList[index].numInStock || this.quantityList[index] < 0) {
			return;
		}
		this.basket.editQuantity(index,this.quantityList[index]);
		this.refreshPrice();
	}
	
	refreshPrice() {
		this.totalPrice = this.basket.getTotalPrice();
	}

	removeProduct(index:number) {
		this.basket.remove(index);
		this.refreshLists();
		this.refreshPrice();
	}


	//Private methods

	finalQuantityCheck():boolean {
		var count = 0; //Count total quantity sum, if 0 or less checkout does not work
		for (var i = 0; i<this.itemsList.length; i++) {
			count = count + this.quantityList[i];
			if (isNaN(this.quantityList[i]) || this.quantityList[i] == null) { //Check if any quantityList errors
				return true;
			}
		}

		if (count <= 0) {
			return true;
		}

		for (var i = 0;i<this.quantityList.length; i++) {
			if (this.quantityList[i] > this.productsList[i].numInStock || this.quantityList[i] < 0) {
				return true;
			}
		}
		if (this.quantityList.length == 0) {
			return true;
		}
		return false;
	}

	disableUpdate(index:number):boolean {
		if (isNaN(this.quantityList[index]) || this.quantityList[index] == null) {
			return true;
		}
		if (this.quantityList[index] > this.productsList[index].numInStock || this.quantityList[index] < 0) {
			return true;
		}
		return false;
	}

	getMax(index:number):number {
		return this.productsList[index].numInStock;
	}

	refreshLists() {
		this.itemsList=this.basket.getItemsList();
		this.quantityList=this.basket.getQuantityList();
		setTimeout(this.refreshProductsList(), 150);
	}

	refreshProductsList() {
		this.productsList = this.basket.getProductsList();
	}

	calculateSubtotal(price:number,quantity:number):number {
		if (price*quantity < 0 || isNaN(quantity) || quantity == null) {
			return 0;
		}

		return price*quantity;
	}

	getProducts() {
		this.productsList = [];
		for (var i = 0; i<this.itemsList.length; i++) {
			var item = this.itemsList[i];
			var pos = i;
			this.db.object('/Products/'+item).valueChanges()
				.subscribe((pro:Product) => {this.productsList.push(pro); console.log(pro.price) ; console.log(this.quantityList[pos]); this.totalPrice = this.totalPrice + (pro.price * this.quantityList[pos]);});
		}
	}


	goBack(): void {
		this.location.back();
	}

}