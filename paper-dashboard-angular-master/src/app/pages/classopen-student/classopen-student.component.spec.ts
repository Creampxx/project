import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassopenStudentComponent } from './classopen-student.component';

describe('ClassopenStudentComponent', () => {
  let component: ClassopenStudentComponent;
  let fixture: ComponentFixture<ClassopenStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassopenStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassopenStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
