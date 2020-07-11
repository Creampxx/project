import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from '../_services';
import { AngularFireDatabase, AngularFireList  } from 'angularfire2/database';

 
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    
}

export const ROUTES1: RouteInfo[] = [
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/student-class', title: 'วิชาที่เรียน',     icon:'nc-bullet-list-67',    class: '' },
    { path: '/user',     title: 'แก้ไขข้อมูลส่วนตัว',        icon:'nc-settings',       class: '' },
];

export const ROUTES2: RouteInfo[] = [
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  //  { path: '/classopen', title: 'วิชาเปิดสอน',     icon:'nc-bullet-list-67',    class: '' },
    { path: '/table3',          title: 'จัดการรายวิชา',              icon:'nc-single-copy-04',      class: '' },
    { path: '/table2',       title: 'จัดการอุปกรณ์',    icon:'nc-spaceship',  class: '' },
    { path: '/table',         title: 'จัดการผู้ใช้',        icon:'nc-tile-56',    class: '' },
    { path: '/user',     title: 'แก้ไขข้อมูลส่วนตัว',        icon:'nc-settings',       class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    constructor( public db: AngularFireDatabase,public authenticationService: AuthenticationService)
    {}
    public menuItems: any[];
    name :any[];
    status:any;
    uId:any[];
    id : string;
    ngOnInit() {
        console.log(this.authenticationService.currentUserValue)
        this.name = this.authenticationService.currentUserValue['user']['fullname'];
        this.uId = this.authenticationService.currentUserValue['user']['uId'];
        // this.user_id = this.authenticationService.currentUserValue['user_id'];
        if(this.authenticationService.currentUserValue['user']['piority'] == 'NISIT'){         
            this.status = 'นิสิต';
            this.menuItems = ROUTES1.filter(menuItem => menuItem);
        }
        else if(this.authenticationService.currentUserValue['user']['piority'] ==  'PROFESSOR'){
            this.status = 'อาจารย์';
            this.menuItems = ROUTES2.filter(menuItem => menuItem);
            
        }
        console.log(this.authenticationService.currentUserValue['user']['id'])
    }
}
