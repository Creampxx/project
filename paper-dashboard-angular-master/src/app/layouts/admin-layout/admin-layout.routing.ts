import { Routes } from '@angular/router';


import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';

import { IconsComponent } from '../../pages/icons/icons.component';
// import { MapsComponent } from '../../pages/maps/maps.component';
import { StudentClassComponent } from '../../pages/student-class/student-class.component'
import { ClassopenComponent }       from '../../pages/classopen/classopen.component';
import { Table2Component } from '../../pages/table2/table2.component';
import { Table3Component } from '../../pages/table3/table3.component';
import { ClassopenStudentComponent } from '../../pages/classopen-student/classopen-student.component'

export const AdminLayoutRoutes: Routes = [

    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
  
    { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'student-class',  component: StudentClassComponent },
    { path: 'classopen',     component:  ClassopenComponent },
    { path: 'classopen-student',    component:  ClassopenStudentComponent },
    { path: 'table2',         component: Table2Component },
    { path:'table3',         component: Table3Component }
];
