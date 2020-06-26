import { Component, OnInit } from '@angular/core';
//import { AuthenticationService } from '../shared/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import {  AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    email: string;
    password: string;

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(

        private formBuilder: FormBuilder,
        public authenticationService: AuthenticationService, private http: HttpClient,
        private router: Router,
        private af: AngularFireAuth
    ) { }
    loginForm: FormGroup;
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    async signIn() {
        let data = {
            email: this.loginForm.value.username,
            password: this.loginForm.value.password
        };
        this.authenticationService.login(data.email,data.password)
      
         
        
        //  .then((result) => {
        //     console.log(result);
        //     if(result["piority"] == "nisit"){
        //         console.log(result)
        //         this.router.navigateByUrl('/classopen');
        //     }
        //     else if(result["piority"] == "PROFESSOR"){
        //         this.router.navigateByUrl('/table');
        //     }
        //     else {
        //         alert("รหัสผิด ไอ้โง่ แกไม่มีสิทธิ์ มาขอเข้าระบบฉัน!!!!");
        //     }

        //  })
        // this.af.auth.signInWithEmailAndPassword(data.email, data.password).then(result => {
        //     console.log(result)
        //     const user = result.user;
        //     this.af.auth.currentUser.getIdTokenResult()
        //     .then(idtoken => {
        //         console.log("token",idtoken)
        //         console.log("uid",idtoken['user_id'])
        //         localStorage.setItem('currentUser', JSON.stringify(user))
                
        //     })
        //     .catch(err => {
        //         console.log(err.message)
        //     })
//             firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        showAdminUI();
//      } else {
//        // Show regular user UI.
//        showRegularUI();
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
            // if(user){
            //     this.router.navigateByUrl('/table');
            // }
            // if (result['message'] == 'Login Success') {
            //     this.router.navigateByUrl('/table');
            // }
        // })
        // .catch(err => {
        //     console.log(err.message)
        // })
        // this.http.post<any>('http://localhost:5001/verification-classrooms/us-central1/api/login', data, { headers: this.headers }).subscribe(result => {
        // });
    }
}