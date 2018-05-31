import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../classes/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderListObservable:Observable<any[]>
  orderList:Order[];

  constructor(private db:AngularFireDatabase, private router:Router) { 
    this.orderListObservable = db.list('/Orders').snapshotChanges().map(changes => {
			return changes.map( c => ({ key: c.payload.key, ...c.payload.val()}))
    });
    
  }

  onSelect(order){
    this.router.navigate(['admin/order-detail', order.key ]);
  }

  ngOnInit() {
  }

}
