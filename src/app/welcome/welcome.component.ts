import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

	constructor(public router: Router, private http: HttpClient) { }

	currentUserName = '';

	ngOnInit() {
		var curUserId = localStorage.getItem('curUserId');
		if (localStorage.getItem('curUserId')) {
			this.http.get('http://localhost:3000/employees/' + curUserId).toPromise().then(res => { // Success
				console.log(res);
				if (res[0] && res[0]['name']) {
					this.currentUserName = res[0]['name'];
				} else {}
			}, err => { // Error
				console.log(err);
			});
		} else {
			this.router.navigate(['login']);
		}
	}

}
