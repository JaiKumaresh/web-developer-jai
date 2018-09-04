import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	constructor(private formBuilder: FormBuilder, private http: HttpClient, public router: Router) {}

	signupForm:FormGroup;
	signupErr = { name: false, email: false, address: false, mobileno: false, password: false };

	enterText (fieldName) {
		this.signupErr[fieldName] = false;
	}

	onSubmit() {
		if (this.signupForm.valid) {
			var reqData = this.signupForm.value
			this.http.post('http://localhost:3000/employees', reqData).toPromise().then(res => { // Success
				console.log(res['insertId']);
				if (res['insertId']) {
					localStorage.setItem('curUserId', res['insertId']);
					this.router.navigate(['welcome']);
				} else {}
			}, err => { // Error
				console.log(err);
			});
		} else {
			var value = this.signupForm.value
			for (let key in value) {
				if (!value[key]) {
					this.signupErr[key] = true;
				}
			}
		}
	}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			address: ['', Validators.required],
			mobileno: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

}
