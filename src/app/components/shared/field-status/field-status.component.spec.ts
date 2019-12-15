import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldStatusComponent } from './field-status.component';

describe('FieldStatusComponent', () => {
  let component: FieldStatusComponent;
  let fixture: ComponentFixture<FieldStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
