import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'; 
import { Category } from '../../classes/classes';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {

		categoryName:string;

		categoryRef: AngularFireList<Category>;

		constructor(private db: AngularFireDatabase) { //private db: AngularFireDatabase
		this.categoryRef = db.list('/Category');
	}

	onKeyName(value:string){
		this.categoryName = value;
	}

	buttonClick(){
		this.categoryRef.push(new Category(this.categoryName));
		alert('Submitted');
		window.location.reload();
	}

	ngOnInit() {
	}

}