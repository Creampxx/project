import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';


import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';

import { IconsComponent }           from '../../pages/icons/icons.component';
import { StudentClassComponent }    from '../../pages/student-class/student-class.component';

import { ClassopenComponent }       from '../../pages/classopen/classopen.component';
import { Table2Component }          from '../../pages/table2/table2.component';
import { Table3Component }          from '../../pages/table3/table3.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClassopenStudentComponent } from 'app/pages/classopen-student/classopen-student.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
  
    UserComponent,
    TableComponent,
    Table2Component,
    Table3Component,
 
    IconsComponent,
    StudentClassComponent,
    ClassopenComponent,
    ClassopenStudentComponent
  ]
})

export class AdminLayoutModule {}
