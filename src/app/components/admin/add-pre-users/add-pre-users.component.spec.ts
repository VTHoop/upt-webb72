import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreUsersComponent } from './add-pre-users.component';

describe('AddPreUsersComponent', () => {
  let component: AddPreUsersComponent;
  let fixture: ComponentFixture<AddPreUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
