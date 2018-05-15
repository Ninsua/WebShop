import { Component, OnInit, NgZone,ChangeDetectorRef } from '@angular/core';
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
		this.itemsList=this.basket.getItemsList();
		this.quantityList=this.basket.getQuantityList();
		setTimeout(this.getProducts(),200);
	}
	
	refreshQuantity(index:number) {
		this.basket.editQuantity(index,this.quantityList[index]);
		this.refreshPrice();
	}
	
	refreshPrice() {
		this.totalPrice = this.basket.getTotalPrice();
		console.log("refreshed price");
		console.log(this.basket.getTotalPrice());
	}

	removeProduct(index:number) {
		this.basket.remove(index);
		this.refreshLists();
	}

	//Private methods

	refreshLists() {
		this.itemsList=this.basket.getItemsList();
		this.quantityList=this.basket.getQuantityList();
		setTimeout(this.refreshProductsList(), 150);
	}

	refreshProductsList() {
		this.productsList = this.basket.getProductsList();
	}

	calculateSubtotal(price:number,quantity:number):number {
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