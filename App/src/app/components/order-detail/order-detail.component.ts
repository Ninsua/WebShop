import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Product, Category, Order, Address } from '../../classes/classes';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'; 
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { SigninService } from './../../services/signin/signin.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']

})
export class OrderDetailComponent implements OnInit {

  key:string;
  address:Address = new Address('', '', '', '');
  order:Order = new Order('', this.address, false, false, '', '');

  itemList:string[] = [];
  quantityList:string[] = [];
  productsList: Product[] = [];

  totalPrice:number = 0;



  constructor(private router:ActivatedRoute, private db:AngularFireDatabase) {
   
  }

  calculateSubtotal(price:number, quantity:string):number {
		return price* parseInt(quantity);
  }
  
  calculateTotal(){
    this.totalPrice = 0;
    for (var i=0; i<this.productsList.length; i++){
      this.totalPrice = this.totalPrice + this.productsList[i].price * parseInt(this.quantityList[i]);
      console.log(this.productsList[i].price);
      console.log(parseInt(this.quantityList[i]));
    }
  }

  paymentStatus():string {
    if (this.order.ifPayed) {
      return 'Payment Completed!';
    }
    else {
      return 'Payment Imcompleted!';
    }
  }

  shippingStatus():string {
    if (this.order.ifShipped){
      return 'Order Shipped! ';
    }
    else {
      return 'Order Not Shipped!'
    }
  }

  stringToList(str:string):string[]{
    let result =  str.split(';',4000);
    return result;
  }

  ngOnInit() {
    this.key = this.router.snapshot.paramMap.get('key')+'';
    
    this.db.object('/Orders/'+this.key).valueChanges().subscribe(
      (order:Order) => {
        this.order = order;
        this.itemList = this.stringToList(order.itemListStr);
        this.quantityList = this.stringToList(order.quantityListStr);
        
        for (var i=0; i<this.itemList.length; i++){
          console.log('i:'+ this.itemList[i]);
          this.db.object('/Products/'+this.itemList[i]).valueChanges().subscribe(
            (product:Product) => {
              this.productsList.push(product);
              this.calculateTotal();
            }
          )
          
          
          
        }
      }
    );




    
    
  }

}
