import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from '../../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { groupBy, mergeMap, toArray, reduce } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { from, zip, of } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { data } from 'jquery';


let ELEMENT_DATA = [
  { serialNumber: 1, row: 'Hydrogen', col: 1.0079, species: 'H' },
  { serialNumber: 2, row: 'Helium', col: 4.0026, species: 'He' },
  { serialNumber: 3, row: 'Lithium', col: 6.941, species: 'Li' },
  { serialNumber: 4, row: 'Beryllium', col: 9.0122, species: 'Be' },
  { serialNumber: 5, row: 'Boron', col: 10.811, species: 'B' },
  { serialNumber: 6, row: 'Carbon', col: 12.0107, species: 'C' },
  { serialNumber: 7, row: 'Nitrogen', col: 14.0067, species: 'N' },
  { serialNumber: 8, row: 'Oxygen', col: 15.9994, species: 'O' },
  { serialNumber: 9, row: 'Fluorine', col: 18.9984, species: 'F' },
  { serialNumber: 10, row: 'Neon', col: 20.1797, species: 'Ne' },
]

@Component({
  selector: 'classopen-cmp',
  moduleId: module.id,
  templateUrl: 'classopen.component.html'
})

export class ClassopenComponent implements OnInit {

  //Hosting
  //API_SERVER = "http://localhost:5001/verification-classrooms/us-central1/api/";
   API_SERVER = "https:/us-central1-verification-classrooms.cloudfunctions.net/api/";


  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  idparam: any;
  Idenparam: any;
  displayedColumns: string[] = ['serialNumber', 'row', 'col', 'species'];
  stdname: any;
  stduId: any;
  studentInfo: any[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);





  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSection: any;
  User: any;
  name: any;
  day: any;
  subject: any;
  CLOSE: boolean = true;
  datatableUser: any;
  datatableTime: any;
  Activetime: any;
  Attandace: any;
  timelate: any;
  getday: any;
  student: any;
  players: any;
  values: any[];
  green: any;
  yellow: any;
  red: any;
  countO = 0;
  countL = 0;
  countA = 0;
  count1 = [];
  count2 = [];
  count3 = [];
  count: number = 0;
  Arr: any;





  constructor(private toastr: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    console.log(this.authenticationService.currentUserValue['token'])
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params.id)
      ;
      this.User = this.authenticationService.currentUserValue['user'];
      this.name = this.authenticationService.currentUserValue['user']['fullname']

      console.log(this.name)
      this.idparam = params.id
    });
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.authenticationService.currentUserValue == null) {
      this.router.navigateByUrl('/login');
    }
    this.getSectionData();
    this.getAttandace();

  }

  export() {
    let dataid = this.idparam
    window.open(`${this.API_SERVER}export/` + dataid, 'Download')
    //   this.http.get<any>('http://localhost:5001/verification-classrooms/us-central1/api/export/'+ dataid).subscribe(result => {

    // });
  }

  getSectionData() {
    let dataid = this.idparam

    console.log(dataid)
    this.http.get<any>(`${this.API_SERVER}getSectionData/` + dataid, { headers: this.headers }).subscribe(result => {
      this.dataSection = result['data'][0]
      console.log(this.dataSection)
      console.log(this.dataSection.subject)
      this.datatableTime = this.dataSection.timetable
      this.datatableUser = this.dataSection.student
      console.log(this.datatableUser)
      this.Activetime = this.datatableTime.day + "/" + this.datatableTime.starttime + "/" + this.datatableTime.endtime



    });
  }
  getAttandace() {
    try{
    let dataid = this.idparam
    this.http.get<any>(`${this.API_SERVER}getAttandace/` + dataid, { headers: this.headers }).subscribe(result => {
      this.Attandace = result['data']
      console.log(this.Attandace)
      this.timelate = this.Attandace.section.timelate;
      this.getday = this.Attandace.classes;
      this.studentInfo = this.Attandace.student;
      let source = from(this.studentInfo);
      //group by uId
      let example = source.pipe(
        groupBy(person => person.uId),
        // return each item in group as array
        mergeMap(group => group.pipe(toArray())));
      this.values = [];
      let subscribe = example.subscribe(val => {
        this.values.push(val);
         console.log(this.values)
      });
      for(let i=0;i< this.values.length;i++)
         this.Arr = this.values[i].reverse()

      console.log("start")
      for (let i = 0; i < this.values.length; i++) {
        this.countO = 0;
        this.countL = 0;
        this.countA = 0;
        for (let j = 0; j < this.values[i].length; j++) {
          if (this.values[i][j].status == "ONTIME") {
            this.countO++;
            this.count1[i] = this.countO;
          }
          else if (this.values[i][j].status == "LATE") {
            this.countL++;
            this.count2[i] = this.countL;
          }
          else if (this.values[i][j].status == "ABSENT") {
            this.countA++;
            this.count3[i] = this.countA;
            console.log(this.values[i][j].name);
            console.log(this.count3[i]);
          }
        }
      }
      console.log("stop")

    });
  }
  catch(err){
    this.router.navigateByUrl('/login');
  }
  }
  getColor(color) {
    switch (color) {
      case 'ONTIME':
        this.count++;
        return 'green';
      case 'LATE':
        return 'yellow';
      case 'ABSENT':
        return 'red';
    }
  }
  ScannerConnect() {
    console.log()
    if (this.dataSection.scId == "") {
      this.router.navigateByUrl('/table2');
    }
    else {
      this.CLOSE = false
    }
  }
}
