import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'; 
import { Category } from '../../classes/classes';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
	//Admin access stuff, needs to be fixed l8er
	currentUser:string;
	ad:boolean;
 	uid:string[]=['hT2JRuUpxTbc5lS1Q3ig9J2Deze2',
	'GFTt4EJ9dxXEXC1VFeKjqBnnsE02',
	'tPk7fgs2TucAYTQUOgAd05UabUb2'
];

		categoryName:string="";

		categoryRef: AngularFireList<Category>;

		constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
		this.currentUser=afAuth.auth.currentUser.uid;
		this.categoryRef = db.list('/Category');
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

	onKeyName(value:string){
		this.categoryName = value;
	}

	buttonClick(){
		if (this.categoryName.length==0) {
			alert('Category name is missing!');
		} else {
			this.categoryRef.push(new Category(this.categoryName));
			alert('Submitted');
			window.location.reload();
		}
	}

	ngOnInit() {
	}

}