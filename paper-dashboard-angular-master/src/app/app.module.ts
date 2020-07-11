import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { CheckComponent } from './check/check.component';

import { MatSortModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { FileUploadModule } from 'ng2-file-upload';
import { ValidateEqualModule } from 'ng-validate-equal';
@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    AdminLayoutComponent,
    CheckComponent,
  ],
  imports: [
    ValidateEqualModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    SidebarModule,
    HttpClientModule,
    NavbarModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule, MatPaginatorModule, MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    FileUploadModule
  ],
  providers: [











    



    
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 

}
