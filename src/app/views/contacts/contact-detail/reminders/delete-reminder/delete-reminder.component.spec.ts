import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteReminderComponent } from "./delete-reminder.component";

describe("DeleteReminderComponent", () => {
  let component: DeleteReminderComponent;
  let fixture: ComponentFixture<DeleteReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteReminderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
