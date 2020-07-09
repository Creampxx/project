import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BsModalService } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.scss']
})
export class StudentClassComponent implements OnInit {
  headers = new HttpHeaders().set('token', this.authenticationService.currentUserValue['token']);
  data: any;
  Idsection: any;
  constructor(private db: AngularFireDatabase,
    private http: HttpClient,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue == null) {
      this.router.navigateByUrl('/login');
    }
    this.getSectionForStudent();
  }

  getSectionForStudent(){
    this.http.get<any>('http://localhost:5001/verification-classrooms/us-central1/api/getSectionforStudent', { headers: this.headers }).subscribe(result => {
      this.data = result['data']
      console.log(this.data)
    });
  }

  Routering(data) {

    console.log(data)
    this.Idsection = data
    this.Idsection.key = data.id
    console.log(this.Idsection.key)
    this.router.navigate(['/classopen-student'], {
      queryParams: {
        id: this.Idsection.key, subject: this.Idsection.subject
      }
    }
    );
  }
}
