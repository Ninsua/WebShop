import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { Product } from '../../classes/classes';
import { AngularFireList } from 'angularfire2/database';
import { Location } from '@angular/common';
import { SigninService } from './../../services/signin/signin.service';
import { BasketService } from '../../services/basket/basket.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  productRef:AngularFireList<any>;
  productList:Observable<any[]>;
  productArray:Product[];
  productArray2:Product[];
  //newProductArray:Product[] = [];
  public keyWords:string = "";
  imageUrlList:Observable<string[]>;
	
	signinService:SigninService;

  constructor(
	private db: AngularFireDatabase,
	private afstorage: AngularFireStorage,
	private router:Router,
	private location: Location,
  private signIn:SigninService,
  private basket: BasketService
	) {
		this.signinService = signIn;
    	//get products from database
    	this.productList = db.list('/Products').snapshotChanges().map(changes => {
			return changes.map( c => ({ key: c.payload.key, ...c.payload.val()
      }))
    });

    this.productList.subscribe(
      (value:Product[]) => {this.productArray = value;
                            this.productArray2 = value;}
    );


    
  }

  search(){ 
    this.productArray = this.productArray2;

    if (this.keyWords != "") {
      let newProductArray:Product[] = [];

      var keyWordArray:string[] = this.keyWords.split(" ");

      for (let product of this.productArray) {
        var brandAndNameSearch:string = product.brand.toLowerCase() + " " + product.name.toLowerCase();
        
        var count:number = 0;
        for (var i = 0; i < keyWordArray.length; i++) {
          var currentKeyword:string = keyWordArray[i].toLowerCase();

          if (brandAndNameSearch.includes(currentKeyword)) {
            count++;
          }
        }

        if (count == keyWordArray.length) {
          newProductArray.push(product);
        }

      }

      this.productArray = newProductArray;
    }
  }

  ngOnInit() {
  }

  onKeyWord(value:string){
    this.keyWords = value.toLowerCase();
  }
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}

  onSelect(product){
    console.log(product.key);
    this.basket.add(product.key);
  }
	
	goBack(): void {
		this.location.back();
	}

  goTodetails(product){
    this.router.navigate(['product', product.key ]);
  }

}
