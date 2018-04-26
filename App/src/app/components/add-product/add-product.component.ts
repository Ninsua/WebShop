import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product, Category } from '../../classes/classes';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'; 
import { AngularFirestore } from 'angularfire2/firestore'


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  // product attribute
  name:string;
  selectedCategory:string;
  imageURL:string;
  price :number;
  numInStock:number;   // default 0
  description:string;
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


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.productRef = db.list('/Products');
    this.categoryList = db.list('/Category').valueChanges();
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
    const path = 'Products/'+(new Date().getTime())+'_'+file.name;
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

  onKeyPrice(value: number){
    this.price = value;
  }

  onKeyNumber(value:number){
    this.numInStock =value;
  }

  onKeyDescription(value: string){
    this.description = value;
  }



  // button click upload to database
  buttonClick(){
	if (isNaN(this.numInStock) || isNaN(this.price)) {
		console.log("test");
		alert('One or more property is missing!');
	} else {
		this.prod = new Product(this.name, this.selectedCategory, this.imageURL, this.price, this.numInStock, this.description);
		this.productRef.push(this.prod);
		alert('Submitted');
		window.location.reload();
	}
  }

  ngOnInit() {
  }

}