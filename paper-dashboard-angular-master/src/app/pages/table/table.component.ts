import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

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
   User:any[];

   constructor(db: AngularFireDatabase){
       this.userList = db.list('User');
   }

    ngOnInit(){
        this.userList.snapshotChanges().pipe(map(actions => {

            return actions.map(action => ({ key: action.key, value:action.payload.val()})
            );

        })).subscribe(items => {

            this.User = items;
        });
     }

     delUser(data){
         console.log(data);
         this.userList.remove(data.key);
     }
     EditUser(data){

     }
}
