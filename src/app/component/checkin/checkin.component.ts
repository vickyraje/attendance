import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HomeService } from '../services/home.service'; 
import swal from 'sweetalert2';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  currLat: any; currLng: any; user: any;
  constructor(private homeService: HomeService, private router: Router) { 
    this.user = localStorage.getItem('user');
  }

  ngOnInit() {
    if (localStorage.getItem("user") === null) { 
      this.router.navigateByUrl('/');
    }
    if (localStorage.getItem("checkin") == '1') { 
      this.router.navigateByUrl('/checkOut');
    }
    this.getCurrentLocation();
  }

  checkin(){
    this.homeService.userCheckin(this.currLat,this.currLng,this.user).subscribe(response => { 
      if(response.Response==1) {
        swal.fire('Checkin Successfully', '', 'success');
        localStorage.setItem('checkin', '1');
        this.router.navigateByUrl('/checkOut');
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
