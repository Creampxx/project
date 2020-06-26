import { Component } from '@angular/core';
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

@Component({
    selector: 'classopen-cmp',
    moduleId: module.id,
    templateUrl: 'classopen.component.html'
})

export class ClassopenComponent{
  constructor(private toastr: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService) {}

  ngOnInit(){
    console.log(this.authenticationService.currentUserValue)     
        if(this.authenticationService.currentUserValue == null){

            this.router.navigateByUrl('/login');

        }
  }
  
 
}
