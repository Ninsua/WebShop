import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../../classes/classes';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BasketService {
	itemsList:string[] = [];
	quantityList:number[] = [];
	productsList:Product[] = [];
	totalPrice:number=0;

	itemsMock:string[] = [
	];
	
	quantityMock:number[] = [5,2,9];

	constructor(private cookieService: CookieService, private db: AngularFireDatabase) {
		//Check if cookies exists
		if (!this.cookiesExists()) {
			this.createCookies();
			this.getProducts();
			setTimeout(this.updateTotalPrice(),10000);
		} else { //If the cookies exists: import, convert and save the content into lists
			console.log("cookies exist");
			this.itemsList = this.stringToStringList(this.cookieService.get('items'));
			if (this.itemsList[0] === "") { //Check to make sure an empty cookie doesn't create an empty product
				this.itemsList = [];
				this.totalPrice = 0;
			} else {
				this.quantityList = this.stringToNumberList(this.cookieService.get('quantity'));
				this.getProducts();
				setTimeout(this.updateTotalPrice(),10000);
		}
		}
	}
	
	//API
	
	add(key:string) {
		var exists:boolean = false;
		var index:number;
		for (var i = 0; i<this.itemsList.length; i++) {
			if (this.itemsList[i] === key) {
				exists = true;
				index = i;
			}
		}

		if (!exists) {
			this.itemsList.push(key);
			this.quantityList.push(1);
			this.productsList.push(this.getDbObject(key));
			//setTimeout(this.updateTotalPrice(),10000);
			setTimeout(this.updateCookies(),5000);
		} else {
			this.editQuantity(index,this.quantityList[index]+1); 
		}

	}
	
	addQuantity(key:string,quantity:number) {
		this.itemsList.push(key);
		this.quantityList.push(quantity);
		this.productsList.push(this.getDbObject(key));
		setTimeout(this.updateCookies(),5000);
	}
	
	editQuantity(index:number,quantity:number) {
		this.quantityList[index] = quantity;
		setTimeout(this.updateTotalPrice(),10000);
		this.updateCookies();
	}
	
	remove(index:number) {
		this.itemsList.splice(index,1);
		this.quantityList.splice(index,1);
		this.productsList.splice(index,1);
		setTimeout(this.updateTotalPrice(),10000);
		this.updateCookies();
		if (this.itemsList.length == 0) {
			this.totalPrice = 0;
		}
	}
	
	getItemsList():string[] {
		return this.itemsList;
	}
	
	getQuantityList():number[] {
		return this.quantityList;
	}

	getProductsList():Product[] {
		return this.productsList;
	}

	updateTotalPrice() {
		this.totalPrice = 0;
		if (this.productsList.length > 0) {
			for (var i = 0; i<this.itemsList.length; i++) {
				this.totalPrice = this.totalPrice + (this.productsList[i].price * this.quantityList[i]);
			}
		}
	}
	
	getTotalPrice():number {
		return this.totalPrice;
	}

	//Private logic

	getProducts() {
		this.productsList = [];
		for (var i = 0; i<this.itemsList.length; i++) {
			var item = this.itemsList[i];
			this.db.object('/Products/'+item).valueChanges()
				.subscribe((pro:Product) => {this.productsList.push(pro);});
		}
	}

	getDbObject(item:string):Product {
		var product:Product;
		this.db.object('/Products/'+item).valueChanges()
				.subscribe((pro:Product) => product = pro);
		return product;
	}
	
	cookiesExists():boolean {
		if (!this.cookieService.check('items')) {
			return false;
		} else if (!this.cookieService.check('quantity')) {
			return false;
		} else {
			return true;
		}	
	}

	//TODO:
	// Remove mock and use normal list
	createCookies() {
		if (!this.cookieService.check('items')) {
			this.cookieService.set('items',"");
		}
		if (!this.cookieService.check('quantity')) {
			this.cookieService.set( 'quantity',"");
		}
	}

	updateCookies() {
			this.cookieService.set('items',this.stringListToString(this.itemsList));
			this.cookieService.set( 'quantity',this.numberListToString(this.quantityList));
	}
	
	stringListToString(toString:string[]):string {
		var result:string;
		
		result = "";
		for (var i = 0; i < toString.length; i++) {
			result = result+toString[i]+";";
		}
		
		result = result.substring(0,result.length-1);
		
		return result;
	}
	
	numberListToString(toString:number[]):string {
		var result:string;
		
		result = "";
		for (var i = 0; i < toString.length; i++) {
			result = result+toString[i]+";";
		}
		
		result = result.substring(0,result.length-1);

		return result;
	}
	
	stringToStringList(string):string[] {
		return string.split(';',9000);
	}
	
	stringToNumberList(string):number[] {
		var result:number[] = [];
		var stringList:String[] = string.split(';',9000);;

		for (var i = 0; i<stringList.length; i++) {
			result[i] = +stringList[i];
		}
		
		return result;
	}

}