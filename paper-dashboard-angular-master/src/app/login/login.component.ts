import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';


// import { AlertService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'login.component.html' })

export class LoginComponent implements OnInit {

    email: string;
    password: string;

    constructor(public authenticationService: AuthenticationService) {}

    ngOnInit() {
    }
    
    signUp() {
        this.authenticationService.SignUp(this.email, this.password);
        this.email = ''; 
        this.password = '';
    }
    
    signIn() {
        console.log(this.email)
        this.authenticationService.SignIn(this.email, this.password)
        this.email = ''; 
        this.password = '';
    }
    
    signOut() {
        console.log(this.authenticationService.userData);
        this.authenticationService.SignOut();
    }
}