import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {  AuthenticationService } from '../../_services';

import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    userList : AngularFireList<any>;
    User:any;
    id: string;
    users: Observable<unknown>;
    message: string;
    modalRef: any;
    exname:null;

    constructor(public db: AngularFireDatabase,
        private modalService: BsModalService,
        private http: HttpClient,
        private router: Router,
        private  af: AngularFireAuth,
        private route: ActivatedRoute,
        public authenticationService: AuthenticationService){this.userList = db.list('User');}
        
    ngOnInit(){
       console.log(this.authenticationService.currentUserValue['user'])
       this.User = this.authenticationService.currentUserValue['user'];
       console.log(this.User.uId)
        if(this.authenticationService.currentUserValue == null){

            this.router.navigateByUrl('/login');

        }
        else{
                this.id = this.route.snapshot.paramMap.get("id");
        if(this.id){
            this.getUserByKey(this.id);
            
        }
    }
    }
    openModal(template: TemplateRef<any>) {
        this.exname = this.authenticationService.currentUserValue['user'];
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
      }
    editUserS(key,data: NgForm){
        this.db.list('User').update(key,data.value);
     }
     getUserByKey(id){
        console.log(id)
        this.users = this.db.object('User/'+ id).snapshotChanges().pipe(map(res =>
            {
                // console.log(res);
                return res.payload.val();                
            }));
            console.log(this.users)
     }
     confirm(): void {
        this.message = 'Confirmed!';
        this.modalRef.hide();
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
      }
}
