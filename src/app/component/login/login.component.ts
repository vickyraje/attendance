import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service'; 
import {Router} from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitclicked = false; isShow = false; login: FormGroup; user: any; 
  
  constructor(
	private homeService: HomeService,
	private router: Router,
	private fb: FormBuilder) {
	if (localStorage.getItem("user") === null) { 
      this.router.navigateByUrl('/');
    } else {
		this.router.navigateByUrl('/checkIn');
	}
    if (localStorage.getItem("checkin") == '1') { 
      this.router.navigateByUrl('/checkOut');
    }
    this.buildForm();
  }

  ngOnInit(){ }

  buildForm(): void {
	this.login = this.fb.group({
		'username': ['', Validators.required],
		'password': ['', Validators.required]
	});
  }
  /*Validators.pattern("^[0-9]{10}$")*/

  checkMobile(event){
	if(isNaN(event.target.value)){
		swal.fire('Mobile No Must be a Numbers Only', '', 'warning'); 
		$('#username').val('');
	} else if(event.target.value.length!=10){
		swal.fire('Mobile No Must be a 10 digits', '', 'warning'); $('#username').val('');
	} else {
		this.homeService.checkUsername(event.target.value).subscribe(response => { 
			if(response.Response==1) {
				this.isShow = !this.isShow; $('#username').attr('readonly',true);
				swal.fire('OTP Send Registered Mobile No', '', 'success');
			} else if(response.Response==0) {
				swal.fire(response.Error, '', 'warning');
				$('#username').val('');
			} 
		});
	}
  }
  
  userLogin(login) {
	this.homeService.loginUser(login).subscribe(response => { 
		if(response.Response==1) {
			localStorage.setItem('user', response.Result);
			localStorage.setItem('token', response.token);
			this.router.navigateByUrl('/checkIn');
		} else if(response.Response==2) {
			swal.fire(response.Erorr, '', 'warning');
			$('#password').val('');
		} 
	});
  }
}