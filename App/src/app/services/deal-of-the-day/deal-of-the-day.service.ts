import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../classes/classes';

@Injectable()
export class DealOfTheDayService {
	obsList:Observable<any[]>;
	dbList:AngularFireList<string>;
	keysList:string[] = [];

	dealsList:Product[] = [];

	constructor(private db: AngularFireDatabase) {
		this.obsList = this.db.list('/Deals/').valueChanges();
		this.dbList = this.db.list('/Deals/');
		this.getDeals();
	}

	//API
	add(key:string) {
		if (key.length == 0) {
			return;
		}

		var name = "prod"+key;

		this.db.list('/Deals/'+name).push(key);
	}

	remove(key:string) {
		if (key.length == 0) {
			return;
		}

		var name = "prod"+key;
		var itemRef = this.db.object('/Deals/'+name);
		itemRef.remove();
	}

	//"Private" logic
	getDeals() {
		this.db.list('/Deals/').valueChanges()
			.subscribe((keys:string[]) => this.keysList = keys);
	}


}