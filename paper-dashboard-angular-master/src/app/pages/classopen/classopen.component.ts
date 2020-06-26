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


import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


let ELEMENT_DATA = [
  {serialNumber: 1, row: 'Hydrogen', col: 1.0079, species: 'H'},
  {serialNumber: 2, row: 'Helium', col: 4.0026, species: 'He'},
  {serialNumber: 3, row: 'Lithium', col: 6.941, species: 'Li'},
  {serialNumber: 4, row: 'Beryllium', col: 9.0122, species: 'Be'},
  {serialNumber: 5, row: 'Boron', col: 10.811, species: 'B'},
  {serialNumber: 6, row: 'Carbon', col: 12.0107, species: 'C'},
  {serialNumber: 7, row: 'Nitrogen', col: 14.0067, species: 'N'},
  {serialNumber: 8, row: 'Oxygen', col: 15.9994, species: 'O'},
  {serialNumber: 9, row: 'Fluorine', col: 18.9984, species: 'F'},
  {serialNumber: 10, row: 'Neon', col: 20.1797, species: 'Ne'},
]

@Component({
    selector: 'classopen-cmp',
    moduleId: module.id,
    templateUrl: 'classopen.component.html'
})

export class ClassopenComponent implements OnInit {
  
  displayedColumns: string[] = ['serialNumber', 'row', 'col', 'species'];
  
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private toastr: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService) {}

  ngOnInit(){
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.authenticationService.currentUserValue)     
        if(this.authenticationService.currentUserValue == null){
            this.router.navigateByUrl('/login');
        }
  }
}
