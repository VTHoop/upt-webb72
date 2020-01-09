import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionViewComponent } from './reunion-view.component';

describe('ReunionViewComponent', () => {
  let component: ReunionViewComponent;
  let fixture: ComponentFixture<ReunionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
