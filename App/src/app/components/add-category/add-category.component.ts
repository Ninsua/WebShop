import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'; 
import { Category } from '../../classes/classes';
import { Location } from '@angular/common';
import { SigninService } from './../../services/signin/signin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
	signinService:SigninService;
	categoryName:string="";
	categoryRef: AngularFireList<Category>;

	constructor(private db: AngularFireDatabase,private location: Location,private signIn:SigninService) {
		this.categoryRef = db.list('/Category');
		this.signinService = signIn;
	}
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}
	
	onKeyName(value:string){
		this.categoryName = value;
	}
	
	goBack(): void {
		this.location.back();
	}

	buttonClick(){
		if (this.categoryName.length==0	) {
			alert('Category name is missing!');
		} else {
			this.categoryRef.push(new Category(this.categoryName));
			alert('Category was added!');
			this.goBack();
		}
	}

	ngOnInit() {
	}

}