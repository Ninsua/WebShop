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
  selector: 'app-admin-view-product',
  templateUrl: './admin-view-product.component.html',
  styleUrls: ['./admin-view-product.component.css']
})
export class AdminViewProductComponent implements OnInit {
  productRef:AngularFireList<any>;
  productList:Observable<any[]>;
  productArray:Product[];
  filteredProductList:Observable<any[]>;
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
			return changes.map( c => ({ key: c.payload.key, ...c.payload.val()}))
    });
    
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
