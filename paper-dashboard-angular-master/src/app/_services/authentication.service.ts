import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { User } from '../_models';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        public db: AngularFireDatabase,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        public authenticationService: AuthenticationService, 
        private router: Router,
        private af: AngularFireAuth) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        return this.currentUserSubject.value;
    }

    async login(email: string, password: string) {
        console.log("LOGIN----------------")
        let data = {
            email: email,
            password: password
        };
         return this.http.post<any>('https://us-central1-verification-classrooms.cloudfunctions.net/api/login', data, { headers: this.headers }).subscribe(result => {
            const users = result.data;              
            localStorage.setItem('currentUser', JSON.stringify(users))
            this.currentUserSubject.next(users);
            if(users.user.piority == "NISIT"){
                this.router.navigateByUrl('/student-class');
            }
            else if(users.user.piority == "PROFESSOR"){
                this.router.navigateByUrl('/table3');
            }
            else {
                alert("รหัสผิด ไอ้โง่ แกไม่มีสิทธิ์ มาขอเข้าระบบฉัน!!!!");
                 
            }
        },error => {
            alert(error.error.message)
        
        });
    }

    getUserLogin = async () => {
        const user = await this.af.auth.currentUser;
        console.log("User",user);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}