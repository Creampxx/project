import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import { timetable } from './timetable.model';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.scss']
})

export class Table3Component implements OnInit {
  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  sectionList: AngularFireList<any>;
  scannerList: AngularFireList<any>;
  section: any;
  modalRef: any;
  message: string;
  sId:any;
  sectionNumber:any;
  subject:any;
  Equip:any;
  data:any;
  Scanner: any[];
  timetable =new timetable()
  dataArray =[];
 
  uploader: FileUploader = new FileUploader({ url: "api/your_upload", removeAfterUpload: false, autoUpload: true });


  constructor(db: AngularFireDatabase, private modalService: BsModalService, private http: HttpClient, public authenticationService: AuthenticationService,
    private router: Router) {
    this.sectionList = db.list('Section');
    this.scannerList = db.list('Scanner');
  }
  
  
  newDynamic: any = {};
  ngOnInit() {
    this.dataArray.push(this.timetable)
    let token = this.authenticationService.currentUserValue['token'];
    console.log(this.authenticationService.currentUserValue['token'])
    console.log(this.authenticationService.currentUserValue)
    if (this.authenticationService.currentUserValue == null) {
      this.router.navigateByUrl('/login');
    }
    this.sectionList.snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() })
      );
    })).subscribe(items => {
      this.section = items;
    });
    this.getSection();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }
  AddSubject(data: NgForm) { 
    console.log(this.dataArray)
  }

  handleFileInput(files){

    console.log(files)

  }
  getSection(){
     this.http.get<any>('http://localhost:5001/verification-classrooms/us-central1/api/getSection',{ headers: this.headers}).subscribe(result => {
      this.data = result['data']
      console.log (this.data)
    });
}
delSection(data) {
  console.log(data);
  Swal.fire({
    title: 'คุณต้องการที่จะลบค่าทั้งหมดหรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.sectionList.remove(data);
  Swal.fire('ลบค่าเรียบร้อย!', '', 'success')
}
})
}
addForm(){
this.timetable = new timetable()
this.dataArray.push(this.timetable)
}
delForm(index){
  this.dataArray.splice(index)
}
}
