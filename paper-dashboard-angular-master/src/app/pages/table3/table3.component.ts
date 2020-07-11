import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map, groupBy, mergeMap, toArray } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import readXlsxFile from 'read-excel-file'
import Swal from 'sweetalert2'
import { timetable } from './timetable.model';
import { FileUploader } from 'ng2-file-upload';
import * as XLSX from 'xlsx';
import { DataSource } from '@angular/cdk/table';
import { R3ResolvedDependencyType } from '@angular/compiler';
import { from } from 'rxjs';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES1: RouteInfo[] = [
  { path: '/classopen', title: 'วิชาเปิดสอน', icon: 'nc-bullet-list-67', class: '' }
];
@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.scss']
})
export class Table3Component implements OnInit {

  //Hosting
    //API_SERVER = "http://localhost:5001/verification-classrooms/us-central1/api/";
     API_SERVER = "https:/us-central1-verification-classrooms.cloudfunctions.net/api/";



  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  sectionList: AngularFireList<any>;
  scannerList: AngularFireList<any>;
  section_id: string;
  section: any;
  modalRef: any;
  message: string;
  sId: any;
  sectionNumber: any;
  subject: any;
  Equip: any;
  data: any;
  datatimetest = [];
  scannerPro: any;
  scannerProP: any;
  Scanner: any[];
  timetable = new timetable()
  dataArray = [];
  storeData: any;
  jsonData: any;
  chooseFile: string = 'Choose File';
  worksheet: any;
  fileUploaded: File;
  uId: any[];
  exsection: any;
  day: any;
  starttime: any;
  endtime: any;
  dtime: any;
  public menuItems: any[];
  Idsection: any;
  sectionScan: any;
  ScanScan: any;
  selectedScan: any;
  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    console.log(this.fileUploaded)
    this.readExcel();
    if (typeof (this.fileUploaded) == 'undefined') {
      console.log("Please choose file");
      this.chooseFile = '';
    } else {
      this.chooseFile = this.fileUploaded.name;

    }
  }
  // uploader: FileUploader = new FileUploader({ url: "api/your_upload", removeAfterUpload: false, autoUpload: true });
  constructor(private db: AngularFireDatabase, private modalService: BsModalService, private http: HttpClient, public authenticationService: AuthenticationService,
    private router: Router,
    private auth: AngularFireAuth) {
    this.sectionList = db.list('Section');
    this.scannerList = db.list('Scanner');
  }
  newDynamic: any = {};
  ngOnInit() {
    this.chooseFile = "Choose File";
    this.menuItems = ROUTES1.filter(menuItem => menuItem);
    this.dataArray.push(this.timetable)
    this.uId = this.authenticationService.currentUserValue['user']['uId'];
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
    this.getScannerBy();

  }
  openModal(template: TemplateRef<any>) {

    // this.dataArray = [];
    // this.dataArray.push(this.timetable)

    this.chooseFile = "Choose File";
    this.getSection();
    this.getScannerBy();
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  pressAdd() {
    this.dataArray = [];
    this.dataArray.push(this.timetable)
  }
  AddSection(dataForm: NgForm) {

    let data = {
      sectionNumber: dataForm.value.sectionNumber,
      sId: dataForm.value.sId,
      subject: dataForm.value.subject,
      room: dataForm.value.room,
      timelate:15,
      scId: "",
      uId: this.uId,
      timetable: this.dataArray

    }
    if(data.sectionNumber =="" || data.room =="" || data.sId ==""|| data.subject==""|| data.timetable ==[])
    {
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด',
        text: 'กรุณากรอกค่าให้ครบทุกช่อง',
        footer: ''
      })

    }else{
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'จะเพิ่มรายวิชานี้ใช่หรือไม่?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'เพิ่ม',
          cancelButtonText: 'กลับไปแก้ไข',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.db.database.ref('/Section').push(data)
            .then(() => {
              console.log("Add Success")
            })
      
          console.log(this.dataArray)
          console.log(data)
          this.getSection();
             this.confirm();
            swalWithBootstrapButtons.fire(
              'เพิ่มรายวิชาเรียบร้อย',
              '',
              'success'
            )
         
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'ยกเลิก',
              'กลับไปแก้ไขค่า',
              'error'
            )
          }
        })
      }

    
  }
  getIDSection(data) {
    this.section_id = data.id;
    // console.log(this.section.id)
  }
  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    }
    readFile.readAsArrayBuffer(this.fileUploaded);
  }
  async UploadFile() {
  
    const data = await this.UserImport(this.jsonData);
    console.log("Add Success")
      this.importSuccess();
              this.confirm();
  }
  UserImport = async (data) => {
    if (data === undefined) {
      console.log("Please Insert")
      Swal.fire({
        icon: 'error',
        title: 'กรุณาเลือกไฟล์ที่จะ upload',
        text: '',
        footer: ''
      })
    }
    
    else {
      let datarr = Object.values(data);
      
      let registration = [];
      await this.db.database.ref('Regis').once('value')
        .then(async regis => {
          regis.forEach(r => {
            if (r.val().sId === this.section_id) {
              registration.push({
                uId: r.val().uId,
                sId: r.val().sId
              })
            }
          })
          
          let p = [];
          for (let i = 0; i < datarr.length; i++) {
            let exists = false;
            let data = datarr[i];
            for (let j = 0; j < registration.length; j++) {
              let reg = registration[j];
              if (data["รหัสนิสิต"] === reg["uId"]) {
                exists = true;
              }
            }
            if (!exists) {
              p.push(this.db.database.ref("Regis").push({
                uId: data["รหัสนิสิต"],
                sId: this.section_id
              }))
            }
          }
          await Promise.all(p)
        })
        
      let usersdb = [];
      await this.db.database.ref("User").once('value')
        .then(result_user => {
          result_user.forEach(usr => {
            usersdb.push({
              id: usr.key,
              name: usr.val().name,
              surname: usr.val().surname,
              email: usr.val().email,
              uId: usr.val().uId
            })
          })
          console.log(usersdb)
          for (let i = 0; i < datarr.length; i++) {
            let exists = false;
            let data = datarr[i];
            for (let j = 0; j < usersdb.length; j++) {
              let user_db = usersdb[j];
              if (data["รหัสนิสิต"] === user_db["uId"]) {
                exists = true;
              }
            }
            if (!exists) {
              let stringname = data["ชื่อ-นามสกุล"];
              let splitstr = stringname.split(' ');
              let name = splitstr[0];
              let surname = splitstr[1];
              let uId = data["รหัสนิสิต"];
              let email = uId.concat("", "@ku.ac.th")
              let passwd = uId;
              let d = {
                uId: uId,
                name: name,
                surname: surname,
                email: email,
                password: passwd,
                piority: "NISIT"
              }
              
              this.http.post<any>(`${this.API_SERVER}signup`, d, { headers: this.headers }).subscribe(result => {
                // console.log(result);
                
              });
          
            } 
          }
        }); 
    }
  }
  getScannerBy() {
    try{
    this.http.get<any>(`${this.API_SERVER}getScannerByTeacher`, { headers: this.headers }).subscribe(result => {
      this.scannerPro = result['data']
      console.log(this.scannerPro)
    });
  }
  catch(err){
    console.log(err.message);
    this.router.navigateByUrl('/login');
  }
  }
  getSection() {
    try{
    this.http.get<any>(`${this.API_SERVER}getSection`, { headers: this.headers }).subscribe(result => {
      this.data = result['data']
      console.log(this.data)

    });}
    catch(err){
      this.router.navigateByUrl('/login');
    }
  }
  SectionKey(data) {
    console.log(data)

    console.log(this.scannerPro)
    this.exsection = data;
    this.exsection.id = data.id;
    this.dataArray = data.timetable;
    // for(let i = 0; i < data.timetable.length; i++){ 
    //   if(data.timetable[i]!=null){
    //     console.log(data.timetable[i].day);
    //     console.log(data.timetable[i].starttime);
    //     console.log(data.timetable[i].endtime);
    //     this.exsection[i].day = data.timetable[i].day; 
    //     this.exsection[i].starttime = data.timetable[i].starttime;
    //     this.exsection[i].endtime = data.timetable[i].endtime;
    //   }
    // }
  }
  async editSection(id, data: NgForm) {  
    data.value.timetable
    console.log(data.value)
      console.log(data.value)
      Swal.fire(
        'แก้ไขเรียบร้อย',
        '',
        'success'
      )
      this.db.list("Section").update(id, {
        sectionNumber: data.value.sectionNumber,
        sId: data.value.sId,
        subject: data.value.subject,
        room: data.value.room,
        uId: this.uId,
        timetable: this.dataArray
      });
     
      this.getSection();
      this.getScannerBy();
    
   

  }
  async editScanner(id, data: NgForm){
    this.ScannerID();
    console.log(this.ScanScan.id)
    let scan = {
       scanner_id: this.ScanScan.id,
       scanner:this.ScanScan.scId 
     }

    console.log(data.value.scId)
  console.log(this.exsection.scId)
  console.log(this.exsection.id)
  Swal.fire(
    'แก้ไขเรียบร้อย',
    '',
    'success'
  )
    
  if(data.value.scId === ""){
     scan.scanner_id = "";
     scan.scanner = "";
    await this.http.put<any>(`${this.API_SERVER}updateScanner/${this.exsection.id}`, scan,{ headers: this.headers }).subscribe(result => {
      this.data = result['data']
      console.log(this.data)});
  }
  else{
    this.db.database.ref('/Section').orderByChild('scId').equalTo(data.value.scId).once('value')
    .then(async sc => {
      if(sc.numChildren() >= 1){
        alert("ห้ามเครื่อง1มีมากกว่า 1 วิชา")
      }
      else{
    console.log(scan)
    // console.log(`http://localhost:5001/verification-classrooms/us-central1/api/updateScanner/${this.exsection.id}`)
    await this.http.put<any>(`${this.API_SERVER}updateScanner/${this.exsection.id}`,scan ,{ headers: this.headers }).subscribe(result => {
      // this.data = result['data']
      // console.log(result)
      // console.log(this.data)
    });}
  })
  }
            await this.getSection();
            this.getSection();
            await this.getScannerBy();
  }
  ScannerID() {

    console.log(this.scannerPro.scId)
    if (this.scannerPro.scId !== undefined) {
      this.ScanScan = this.scannerPro.scId;
    }
    else {
      console.log("undefinedddddd!!!!")
    }

    // console.log(this.ScanScan.id)
    // console.log(this.ScanScan.scId)

  }
  delSection(data) {
    console.log(data.id);
    Swal.fire({
      title: 'คุณต้องการที่จะลบรายวิชานี้ใช่หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.http.delete(`${this.API_SERVER}deleteSection/` + data.id, { headers: this.headers })
          .subscribe((ok) => { console.log(ok) });
        this.getSection();
        Swal.fire('ลบค่าเรียบร้อย!', '', 'success')

      }
    })

  }
  addForm() {
    this.timetable = new timetable()
    this.dataArray.push(this.timetable)

  }
  delForm(index) {
    this.dataArray.splice(index)
  }
  confirm(): void {
    // console.log("pass")
    this.message = 'Confirmed!';
    this.modalRef.hide();

  }
  importSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'import สำเร็จ'
    })

  }

  Routering(data) {

    console.log(data)
    this.Idsection = data
    this.Idsection.key = data.id
    console.log(this.Idsection.key)
    this.router.navigate(['/classopen'], {
      queryParams: {
        id: this.Idsection.key, subject: this.Idsection.subject
      }
    }
    );
  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }
 
}