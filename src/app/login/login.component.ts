import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private http: HttpClient, public router: Router) {}

	loginForm:FormGroup;
	loginErr = { email: false, pwd: false };

	enterText (fieldName) {
		this.loginErr[fieldName] = false;
	}

	onSubmit() {
		if (this.loginForm.valid) {
			var self = this;
			this.http.post('http://localhost:3000/employee-login', this.loginForm.value).toPromise().then(res => { // Success
				console.log(res);
				if(res) {
					localStorage.setItem('curUserId', res[0].id);
					self.router.navigate(['welcome']);
				}
			}, err => { // Error
				console.log(err);
			});
		} else {
			var value = this.loginForm.value
			for (let key in value) {
				if (!value[key]) {
					this.loginErr[key] = true;
				}
			}
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			pwd: ['', Validators.required]
		});
	}

}
