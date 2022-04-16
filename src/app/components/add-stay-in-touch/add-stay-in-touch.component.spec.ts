import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStayInTouchComponent } from './add-stay-in-touch.component';

describe('AddStayInTouchComponent', () => {
  let component: AddStayInTouchComponent;
  let fixture: ComponentFixture<AddStayInTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStayInTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStayInTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
