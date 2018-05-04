import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { SigninService } from './../../services/signin/signin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

	signinService:SigninService;
	
	constructor(private db: AngularFireDatabase, private signIn:SigninService) {
		this.signinService=signIn;
	}
	
	isAdmin():boolean {
		return this.signinService.isAdmin();
	}
	
  ngOnInit() {
  }

}
