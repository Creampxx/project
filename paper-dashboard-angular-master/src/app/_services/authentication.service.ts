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
                this.router.navigateByUrl('/classopen');
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
        // this.items=db.list('/candidates_list',{
        //     query:{
        //       orderByChild:'email',
        //       equalTo:'pranavkeke@gmail.com'
        //     }})
        //     .map(item => item.FirstName) as FirebaseListObservable<any[]>;
        // const user_data = this.db.list('User',ref => ref.equalTo("CV9QO5Tl34YpTcsXHNSHl2ZXuE93"))
        // user_data.snapshotChanges().subscribe(items => {
        //     console.log("items",items)
        // })
        // console.log(user_data)
        // this.db.list('key_threads/key_threadList', {  
        //     query: {
        //         orderBy: "key1",
        //         equalTo: 'val1', 
        //         orderBy: "key2",  // I GET ERROR HEARE
        //         equalTo: 'val2', 
        //     }
        // }).subscribe(
        //     result => { 
        //         console.log('result ' + JSON.stringify(result));
        //    });
        
        
    //     user_data.snapshotChanges().pipe(map(actions => {
    //         //console.log(actions);
    //     return actions.map(action => ({ key: action.key, value:action.payload.val()})
    //     );

    // })).subscribe(items => {
    // console.log(items);
    // });
    //     return this.af.auth.signInWithEmailAndPassword(email,password)
    //     .then(result => {
    //         let retun
    //         this.af.auth.currentUser.getIdTokenResult()
    //         .then(idtoken => {
    //             // console.log("token",idtoken);
    //             console.log(result['user']);
    //             const user = result['user'];
    //             console.log(idtoken['claims']);
    //             console.log("uid",idtoken['claims']['user_id'])
    //             localStorage.setItem('currentUser', JSON.stringify(user))
    //             // this.currentUserSubject.next(user);
    //             // return idtoken['claims'];
    //             retun = idtoken['claims'];
    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         })
    //         return retun;
    // });
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