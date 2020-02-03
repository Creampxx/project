import { Component, OnInit } from '@angular/core';
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

export class Table2Component implements OnInit{

    scannerList : AngularFireList<any>;
    
    Scanner:any[];

    constructor(db: AngularFireDatabase){
        this.scannerList = db.list('Scanner');
        
    }

    ScannerReady : any = [];
    Readys :string = null;

    ngOnInit(){ 
        this.scannerList.snapshotChanges().pipe(map(actions => {

            return actions.map(action => ({ key: action.key, value:action.payload.val()})
        );

    })).subscribe(items => {

        this.Scanner = items;
        for(let i = 0;i<this.Scanner.length;i++){
            console.log(this.Scanner[i]['value']['uId']);
            if(this.Scanner[i]['value']['uId'] != null){
                this.ScannerReady[i] = "พร้อม"
                
                
            }
            else{
            this.ScannerReady[i] = "ไม่พร้อม"
        }}
        console.log(this.Scanner);
    });
}




}

