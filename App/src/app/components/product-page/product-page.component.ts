import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { Product } from '../../classes/classes';
import { AngularFireList } from 'angularfire2/database';
import { Location } from '@angular/common';
import { SigninService } from './../../services/signin/signin.service';

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
	private signIn:SigninService
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
    if (this.keyWords != ""){
      let newProductArray:Product[] = [];
      for (let product of this.productArray){
        if (product.name.toLowerCase().indexOf(this.keyWords) >=0 || product.brand.toLowerCase().indexOf(this.keyWords) >= 0){
          newProductArray.push(product);
        }
      }

      this.productArray = newProductArray;
    }
  }

  onKeyWord(value:string){
    this.keyWords = value.toLowerCase();
  }
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}

  onSelect(product){
    this.router.navigate(['admin/edit_product', product.key ]);
  }
	
	goBack(): void {
		this.location.back();
	}

  ngOnInit() {
  }

}
