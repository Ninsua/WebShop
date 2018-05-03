import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Product, Category } from '../../classes/classes';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  // product attribute
  name:string="";
  selectedCategory:string="";
  imageURL:string="";
	imagePath:string="";
  price :number;
  numInStock:number;   // default 0
  description:string="";
  prod:Product;
  // product reference
  productRef: AngularFireList<Product>;

  // Category List from Datebase
  categoryList: Observable<any[]>;

  //upload
  // Main task upload
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
	
	//Admin access stuff, needs to be fixed l8er
	currentUser:string;
	ad:boolean;
 	uid:string[]=['hT2JRuUpxTbc5lS1Q3ig9J2Deze2',
	'GFTt4EJ9dxXEXC1VFeKjqBnnsE02',
	'tPk7fgs2TucAYTQUOgAd05UabUb2'
];

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private afAuth: AngularFireAuth, private location: Location) {
	this.currentUser=afAuth.auth.currentUser.uid;
	this.productRef = db.list('/Products');
	this.categoryList = db.list('/Category').valueChanges();
  }

	//Admin access stuff, needs to be fixed l8er
	isAdmin():boolean {
    if(this.afAuth.auth.currentUser!= null){
      this.currentUser=this.afAuth.auth.currentUser.uid;
      this.ad = false;
      for(var i = 0; i<this.uid.length;i++)
      {
        if (this.currentUser == this.uid[i]) this.ad = true;
      }
    	return this.ad;
    }
}

  // Binding HTML input to TypeScript
  onKeyName(value: string){
    this.name = value;
  }

  startUpload (event: FileList){
    //The File object
    const file = event.item(0);
    
    // Control the file type at client side
    if (file.type.split('/')[0] !== 'image') {
      alert('unsupported file type!');
      return;
    }

    // The storage path
    const path = 'Products/images/'+(new Date().getTime())+'_'+file.name;
	//Save path to product to be uploaded
	this.imagePath = path;
	console.log(path);
    // The main task
    this.task = this.storage.upload(path, file);
    // progress monitoring 
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    // download URL
    this.downloadURL = this. task.downloadURL();
    this.downloadURL.subscribe(url => {
      if (url) {
        this.imageURL = url;
      }
    });
  }

  onKeyPrice(value: number) {
    this.price = value;
  }

  onKeyNumber(value:number) {
    this.numInStock =value;
  }

  onKeyDescription(value: string) {
    this.description = value;
  }

	goBack(): void {
		this.location.back();
	}


  // button click upload to database
  buttonClick() {
	if (this.name.length == 0 || this.selectedCategory.length == 0 || this.imageURL.length == 0 || isNaN(this.price) || isNaN(this.numInStock) || this.description.length == 0) {
		alert('Some properties are missing!');
	} else {
	this.prod = new Product(this.name, this.selectedCategory, this.imageURL, this.imagePath, this.price, this.numInStock, this.description);
	this.productRef.push(this.prod);
	alert('Submitted');
	this.goBack();
	}
  }

  ngOnInit() {
  }

}