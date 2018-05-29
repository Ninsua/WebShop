import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../classes/classes';
import { BasketService } from '../../services/basket/basket.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

	//Stores the key from the routing
	key: string;

	//Stores the product to edit
	product: Product;

	constructor(private route: ActivatedRoute, private location: Location, private db: AngularFireDatabase, private basket: BasketService) {

	}

	ngOnInit() {
		this.getKey();
		this.getProduct();
 	}

 	getKey() {
		this.key = ''+this.route.snapshot.paramMap.get('key');
	}

	getProduct() {
		this.db.object('/Products/'+this.key).valueChanges()
			.subscribe((pro:Product) => this.product = pro);
	}

	addToCart(){
    	this.basket.add(this.key);
	}

	goBack(): void {
		this.location.back();
	}
}
