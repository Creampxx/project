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
import { Pipe, PipeTransform } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { data } from 'jquery';

@Pipe({ name: 'reverse' })

@Component({
  selector: 'app-classopen-student',
  templateUrl: './classopen-student.component.html',
  styleUrls: ['./classopen-student.component.scss']
})
export class ClassopenStudentComponent implements OnInit {
  transform(value) {
    return value.slice().reverse();
  }

  //Hosting
API_SERVER = "http://localhost:5001/verification-classrooms/us-central1/api/";
// API_SERVER = "https:/us-central1-verification-classrooms.cloudfunctions.net/api/";

  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  
  User: any;
  name: any;
  uId: any;
  idparam: any;
  data: any;
  class:any;
  sections:any;
  Atten:any;
  datatableTime: any;
  green:number = 0;
  yellow:number = 0;
  red:number = 0;
  student: any;
  section: any;
  classes: any;
  AttenReverse = [];

  
  constructor(private toastr: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    
    
    console.log(this.authenticationService.currentUserValue['token'])
  this.activatedRoute.queryParams.subscribe(params => { console.log(params.id) 
    this.idparam = params.id});
   
  
  this.User = this.authenticationService.currentUserValue['user'];
    this.name = this.authenticationService.currentUserValue['user']['fullname'];
    this.uId=this.authenticationService.currentUserValue['user']['uId'];

     if(this.authenticationService.currentUserValue == null){
      this.router.navigateByUrl('/login');
        }
        this.getAttandaceByStudent()
        
      }
      
      
      
      getAttandaceByStudent(){
        let idparams =  this.idparam
      this.http.get<any>(`${this.API_SERVER}getAttandaceByStudent/`+idparams,{ headers: this.headers }).subscribe(result => {
        this.data = result['data']
        this.class = this.data['classes']
       this.sections = this.data['sections']
       this.Atten = this.data['student']
        console.log(this.data)
        console.log(this.Atten.length)
        
           this.AttenReverse =this.Atten.reverse(); 
           console.log(this.AttenReverse)


        for(let i =0; i<=this.Atten.length;i++){
        

          if(this.Atten[i].status =="ONTIME"){
            this.green+=1;
          }
          if( this.Atten[i].status == "LATE" )
          {
           this.yellow+=1;
          console.log(this.yellow)
          }
          if( this.Atten[i].status == "ABSENT" )
          {
         this.red+=1
          }
          }
     
      });

        
    }

     

    getColor(color){
        switch (color){ 
          case 'ONTIME':
            return 'green';
          case 'LATE':
            return 'yellow';
            case 'ABSENT':
              return 'red';
        }
    }
    }
  

  


