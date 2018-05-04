import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Product, Category } from '../../classes/classes';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { SigninService } from './../../services/signin/signin.service';

@Component({
	selector: 'app-admin-edit-product',
	templateUrl: './admin-edit-product.component.html',
	styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
	//Signin service
	signinService:SigninService;
	
	// List of products
	productsList: AngularFireList<Product>;

	// Category List from the datebase
	categoryList: Observable<any[]>;
	
	//Stores the key from the routing
	key: string;
	
	//Stores the product to edit
	product: Product;
	
	
	//Upload stuff
	// Main task upload
	task: AngularFireUploadTask;
	// Progress monitoring
	percentage: Observable<number>;
	snapshot: Observable<any>;
	// Download URL
	downloadURL: Observable<string>;
	oldImage: string="";
	changedImage:boolean=false;
	
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private db: AngularFireDatabase,
		private storage: AngularFireStorage,
		private afAuth: AngularFireAuth,
		private signIn:SigninService
		)
	{
		this.signinService = signIn;
		this.productsList = this.db.list('/Products');
		this.categoryList = this.db.list('/Category').valueChanges();
	}
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}
	
	getKey() {
		this.key = ''+this.route.snapshot.paramMap.get('key');
	}
	
	getProduct() {
		this.db.object('/Products/'+this.key).valueChanges()
			.subscribe((pro:Product) => this.product = pro);
	}
	
	startUpload (event: FileList){
    //The File object
    const file = event.item(0);
    
    // Control the file type at client side
    if (file.type.split('/')[0] !== 'image' && file.type.split('/')[1] !== 'pdf') {
		alert(file.type.split('/')[1]);
      alert('unsupported file type!');
      return;
    }
		
    // The storage path
    const path = 'Products/images/'+(new Date().getTime())+'_'+file.name;
	//Remove the old image path and add the new image path 
	this.oldImage = this.product.imagePath;
	this.product.imagePath = path;
	this.changedImage=true;
	
    // The main task
    this.task = this.storage.upload(path, file);
    // progress monitoring 
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // download URL
    this.downloadURL = this. task.downloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        this.product.imageURL = url;
      }
    });
  }
	
	onSubmit() {
		const itemRef = this.db.object('/Products/'+this.key);
		
		//Checks if content is missing, else update in database
		if (this.product.name.length == 0 || isNaN(this.product.price) || isNaN(this.product.numInStock) || this.product.description.length == 0) {
			alert('Some properties are missing!');
		} else {
			itemRef.update({
				name: this.product.name,
				brand: this.product.brand,
				imageURL: this.product.imageURL,
				imagePath: this.product.imagePath,
				price: this.product.price,
   				numInStock: this.product.numInStock,
				description: this.product.description
					   });
			if (this.oldImage.length > 0) {
				this.removeImage(this.oldImage);
			}
			alert('Product has been edited');
			this.goBack();
		}
	}	
	
  itemRemove(){
	//Removes images, if an old image then delete
	this.removeImage(this.product.imagePath);
	if (this.oldImage.length > 0) {
		this.removeImage(this.oldImage);
	}
	//Deletes database content for the product
    const itemsRef = this.db.object('/Products/'+this.key);
    itemsRef.remove();
	alert('Product has been deleted');
	this.goBack();
  }
	
	removeImage(pathToRemove:string){
		const storageRef = firebase.storage().ref();
   		storageRef.child(pathToRemove).delete();
	}
	
	goBack(): void {
		this.location.back();
	}

	ngOnInit() {
		this.getKey();
		this.getProduct();
	}
}