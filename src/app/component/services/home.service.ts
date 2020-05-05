import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class HomeService {
	server = 'http://localhost:3000';

	// Http Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	constructor(private httpClient:HttpClient) {
	}
	/*** Start Get All Slider ***/
	
	/*** Check Username ***/
	checkUsername(str):Observable<any>{
		return this.httpClient.post<any>(this.server+'/checkUsername', { username: str}, this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}

	/*** Check Login ***/
	loginUser(str):Observable<any>{
		return this.httpClient.post<any>(this.server+'/loginUser', {username:str.username,password:str.password}, this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}

	/*** Check User Checkin ***/
	userCheckin(lat,lng,user):Observable<any>{
		return this.httpClient.post<any>(this.server+'/userCheckin', {user:user,lat:lat,lng:lng}, this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}

	/*** Check User Checkout ***/
	userCheckout(lat,lng,user):Observable<any>{
		return this.httpClient.post<any>(this.server+'/userCheckout', {user:user,lat:lat,lng:lng}, this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}

	// Error handling
	errorHandl(error) {
	  let errorMessage = '';
	  if(error.error instanceof ErrorEvent) {
	    errorMessage = error.error.message;
	  } else {
	    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
	  }
	  console.log(errorMessage);
	  return throwError(errorMessage);
	}
   
}