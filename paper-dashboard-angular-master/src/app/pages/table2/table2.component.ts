import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BsModalService } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';


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

    dataready: any;
    data: any;
    modalRef: any;
    message: string;


    constructor(private db: AngularFireDatabase, private http: HttpClient,private modalService: BsModalService) {
      
           
           
        }

ngOnInit() {
        
    this.getScanner();

}
getScanner(){

    this.http.get<any>('http://localhost:5001/verification-classrooms/us-central1/api/getScanner').subscribe(result => {
        this.data = result['data']
      
        for(let i=0;i<result['data'].length;i++)
         {
             if(result['data'].name =! null)
             {
                 this.dataready = "พร้อม"
             }
             else{
                 this.dataready = "ไม่พร้อม"
             }
             console.log(this.data[i].uId)
         }
    });    
}

openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

AddEquipment(data: NgForm){
    console.log(data.value)
    this.db.list("/Scanner").push(data.value)
    this.getScanner();

}
confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }
}

