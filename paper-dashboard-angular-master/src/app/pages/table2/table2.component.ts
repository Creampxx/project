import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BsModalService } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services';
// declare interface TableData {
//     headerRow: string[];
//     dataRows: string[][];
// }


@Component({
  selector: 'table2-cmp',
  moduleId: module.id,
  templateUrl: 'table2.component.html'
})

export class Table2Component implements OnInit {

   //Hosting
   //API_SERVER = "http://localhost:5001/verification-classrooms/us-central1/api/";
    API_SERVER = "https:/us-central1-verification-classrooms.cloudfunctions.net/api/";


  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  scannerList: AngularFireList<any>;
  userList: AngularFireList<any>;
  sectionList:AngularFireList<any>;
  b = [];
  set: true;
  name: any;
  surname: any;
  submit: any;
  data: any[];
  modalRef: any;
  message: string;
  Scanner: any[];
  users: any = {};
  scanners:any = {};
  User: any[];
  id;

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService) {
    this.scannerList = db.list('Scanner');
    this.userList = db.list('User');
    this.sectionList =db.list('Section');

  }

  ngOnInit() {
    console.log(this.authenticationService.currentUserValue)

    if (this.authenticationService.currentUserValue == null) {

      this.router.navigateByUrl('/login');

    }
    else{
      this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
        this.getScannerByKey(this.id);
        
  
}
}
    this.getScanner();
    this.getEQ();
    this.getUser();
    // this.status();

  }
  getEQ() {
    this.scannerList.snapshotChanges().pipe(map(actions => {

      return actions.map(action => ({ key: action.key, value: action.payload.val() })
      );

    })).subscribe(items => {

      this.Scanner = items;
      console.log(this.Scanner)
    });
  }

  getUser() {
   
    this.db.database.ref('User').once('value')
    .then(snapshot_users => {
      let users = [];
        snapshot_users.forEach(user => {
          if(user.val().piority === "PROFESSOR"){
             users.push({
               doc_id : user.key,
               name : user.val().name,
               surname : user.val().surname,
               uId : user.val().uId
             })
          }
        })
        this.User = users;
        // console.log(users)
    })
    .catch(err => {
      console.log(err.message)
    })
   
  }





  getScanner() {

    this.http.get<any>(`${this.API_SERVER}getScanner`).subscribe(result => {
      this.data = result['data'];
      console.log(this.data)
      for (let i = 0; i < result['data'].length; i++) {
        if (result['data'].name == "" && result['data'].surname == "") {
          this.name = result[i]['data'].name = "";
          this.surname = result[i]['data'].surname = "";
          this.submit = this.name + "" + this.surname;
        }
        console.log(this.data[i].uId);
        if (this.data[i].uId != "-") {
          this.b[i] = "เบิกใช้งาน"
          console.log(this.b[i]);
        } else {
          this.b[i] = "ว่าง"
          console.log(this.b[i]);
        }
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.getScanner();
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }
  async delEquipment(data) {
    console.log(data.id);
    console.log(data)

    Swal.fire({
      title: 'คุณต้องการที่จะลบอุปกรณ์นี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
         this.http.delete(`${this.API_SERVER}deleteScanner/` + data.id, { headers: this.headers })
    .subscribe((ok) => { console.log(ok) });
    // this.scannerList.remove(data.id)
    // .then(() => {
    //   this.db.database.ref('/Section').once('value')
    //   .then(sections => {
    //     sections.forEach(s => {
    //       if(s.val().scId === data.scId ){
    //          this.db.database.ref('/Section').child(s.key).update({
    //            scId : ""
    //          })
    //       }
    //     })
    //   })
    // });
   
    this.getScanner();
    Swal.fire('ลบค่าเรียบร้อย!', '', 'success')
}
})
  }
  AddEquipment(data: NgForm) {
    // console.log(data.value)

    let selected = data.value.selectedUser;
    let scId = data.value.scId;
    
     if(scId =="" || scId == null){
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด',
        text: 'กรุณาเพิ่มเครื่องสแกนลายนิ้วมือ',
        footer: ''
      })
     }
else{
    this.db.database.ref('/Scanner').orderByChild('scId').equalTo(scId).once('value')
    .then(sc => {
      if(sc.numChildren() >= 1){
        alert("ห้ามซ้ำ")
      }
      else{
        if (selected === "" && scId != null) {
          this.db.list("/Scanner").push({ uId: "", scId: scId })
        }
        else {
        //  if
          let uId = selected;
          this.db.list("/Scanner").push({ uId: uId, scId: scId })
        }
      }this.confirm();
    })
    
  }
  
    this.getScanner();
  }
 
 

  editEquip(data) {
    this.scanners = data;
    this.scanners.id = data.id


    console.log( this.scanners.id)

    this.db.database.ref("/Scanner").child(this.scanners.id).once('value')
    .then(response => {
       console.log(response.val());
    })

       
  
    // let scId = data.value.scId;
    // let selected = data.value.selectedUser;
    // let uId = selected.uId;
    // if(selected === ""){
    //   this.db.list("/Scanner").push({uId : "",scId : scId})
    // }
    // else{
    //   let uId = selected.uId;
    //   this.db.list("/Scanner").push({uId : uId,scId : scId})
    // }
    // this.getScanner();
  }
  getScannerByKey(id){
    console.log(id)
    this.scanners = this.db.object('Scanner/'+ id).snapshotChanges().pipe(map(res =>
        {
            // console.log(res);
            return res.payload.val();                
        }));
        console.log(this.scanners)
 }



editEquipS(id,data: NgForm){
  // console.log(id)
  // console.log(data.value)
  console.log(data.value)
  let scId = data.value.scId;
  let uId = data.value.selectedUser
  
  this.db.list('Scanner').update(id,{
    uId : uId,
    scId : scId
  });
  Swal.fire(
    'แก้ไขเรียบร้อย',
    '',
    'success'
  )
   this.getScanner();
 }
  confirm(): void {
    this.message = 'Confirmed!';
    console.log("SUCCESS")
    this.modalRef.hide();
  }
}

