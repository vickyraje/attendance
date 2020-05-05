import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HomeService } from '../services/home.service'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  currLat: any; currLng: any; user: any;
  constructor(private homeService: HomeService, private router: Router) {
    this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('/');
    }
    if (localStorage.getItem("checkin") != '1') { 
      this.router.navigateByUrl('/checkIn');
    }
    this.getCurrentLocation();
    if (localStorage.getItem("checkin") == '1') { 
      setInterval(() => {
        this.checkin(); 
      }, 60000);
    }
  }

  checkin(){
    this.homeService.userCheckin(this.currLat,this.currLng,this.user).subscribe(response => { 
      if(response.Response==1) {
        localStorage.setItem('checkin', '1');
        this.router.navigateByUrl('/checkOut');
      } 
    });
  }

  checkout(){
    this.homeService.userCheckout(this.currLat,this.currLng,this.user).subscribe(response => { 
      if(response.Response==1) {
        swal.fire('Checkout Successfully', '', 'success');
        localStorage.removeItem('checkin');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/');
      } 
    });
  }
  
	getCurrentLocation() {
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(position => {	
			this.currLat = position.coords.latitude;
			this.currLng = position.coords.longitude;
		  }); 
		} else {
		  alert("Geolocation is not supported by this browser.");
		}
	}

}
