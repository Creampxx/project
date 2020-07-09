import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {  AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { data } from 'jquery';

@Component({
  selector: 'app-classopen-student',
  templateUrl: './classopen-student.component.html',
  styleUrls: ['./classopen-student.component.scss']
})
export class ClassopenStudentComponent implements OnInit {


  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  User: any;
  name: any;
  uId: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    
    console.log(this.authenticationService.currentUserValue['token'])
  this.activatedRoute.queryParams.subscribe(params => { console.log(params.id) });
   
  
  this.User = this.authenticationService.currentUserValue['user'];
    this.name = this.authenticationService.currentUserValue['user']['fullname'];
    this.uId=this.authenticationService.currentUserValue['user']['uId'];

     console.log(this.name)
     console.log(this.uId)
     if(this.authenticationService.currentUserValue == null){
      this.router.navigateByUrl('/login');
        }
  
      }
    }
  

  


