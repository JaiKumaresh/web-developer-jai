import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	menuTitle = ''

	constructor(public router: Router) {}

	ngOnInit() {
		this.router.events.subscribe((events) => {
			if (events instanceof NavigationStart) {
				console.log(events)
				this.menuTitle = events['url'] == '/signup' ? 'Log in' : events['url'] == '/login' ? 'Sign up' : 'Sign up';
			}
		})
	}

	checkLS (id) {
		return localStorage.getItem(id);
	}

	signout () {
		localStorage.setItem('curUserId', '');
		this.router.navigate(['login']);
	}

}