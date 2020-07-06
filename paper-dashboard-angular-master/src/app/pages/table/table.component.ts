import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {  AuthenticationService } from '../../_services';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

// declare interface TableData {
//     headerRow: string[];
//     dataRows: string[][];
// }

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
   userList : AngularFireList<any>;

    OPEN: boolean = true;
    users :any;
    User:any;
    UserForModal:any[];
    modalRef: any;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    message: string;
    id: string;
    exname:any;
    

   constructor(public db: AngularFireDatabase,
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router,
    private  af: AngularFireAuth,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService){
       this.userList = db.list('User');
       
   }

    ngOnInit(){
        // let uid = this.authenticationService.getUserLogin();
        // console.log("User",uid)
        console.log(this.authenticationService.currentUserValue)
        console.log("UserCurrent",this.authenticationService.currentUserValue['user']['id']);
        // let currentUser = this.af.auth.currentUser;
        // console.log(currentUser);
        let uid = this.authenticationService.currentUserValue['user']['id'];
        if(this.authenticationService.currentUserValue == null){

            this.router.navigateByUrl('/login');

        }
        else{
                this.id = this.route.snapshot.paramMap.get("id");
        if(this.id){
            this.getUserByKey(this.id);
            
        }
       
        
       
     }
     this.getUsers();
     } 
     
     
     getUsers(){
        let uid = this.authenticationService.currentUserValue['user']['id'];
         this.userList.snapshotChanges().pipe(map(actions => {
                //console.log(actions);
            return actions.map(action => ({ key: action.key, value:action.payload.val()})
            );

        })).subscribe(items => {
        console.log(items);
            const userFormDB = items.filter(a => a.key !== uid)
            this.User = userFormDB;        
            console.log( this.User)
        });
        }
 openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
    this.getUsers();
  }
     delUser(data){
        //  console.log(data);
         Swal.fire({
            title: 'คุณต้องการที่จะลบผู้ใช้คนนี้หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.value) {
                 this.http.delete('https://us-central1-verification-classrooms.cloudfunctions.net/api/deleteUser/' + data.key)
                .subscribe((ok)=>{console.log(ok)});
                //  this.userList.remove(data.key);
               
                Swal.fire('ลบค่าเรียบร้อย!', '', 'success')
            }
          })
     
         
      
        
     }
    
     AddUser(data: NgForm){
        let d = {
            uId:data.value.uId,
            name:data.value.name,
            surname:data.value.surname,
            piority:data.value.piority,
            email: data.value.email,
            password: data.value.password
          };
          console.log(d)
        this.http.post<any>('http://localhost:5001/verification-classrooms/us-central1/api/signup', d, { headers: this.headers}).subscribe(result => {
             console.log(result);
        });
     }

     editUser(data){
        //this.db.list("User").push(data.value);
        console.log(data)
        this.exname = data.value;
        this.exname.key = data.key;
        console.log(this.exname.key);
        // document.getElementById("password").removeAttribute("disabled");
        // this.getUserByKey(data.key);
        
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

     editUserS(key,data: NgForm){
         this.db.list('User').update(key,data.value);
     }

     confirm(): void {
        this.message = 'Confirmed!';
        this.modalRef.hide();
      }
}
