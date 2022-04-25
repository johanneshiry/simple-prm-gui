import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Reminder } from "../../../../../models/reminder.model";
import { ReminderApiService } from "../../../../../services/api/reminder-api.service";
import { ToasterComponent } from "@coreui/angular";
import { ToastNotificationUtil } from "../../../../common/toast-notification/toast-notification.util";

@Component({
  selector: "app-delete-reminder[selectedReminder]",
  templateUrl: "./delete-reminder.component.html",
  styleUrls: ["./delete-reminder.component.scss"],
})
export class DeleteReminderComponent implements OnInit {
  @Input()
  selectedReminder?: Reminder;

  show: boolean = false;

  @ViewChild(ToasterComponent) queryResultToast!: ToasterComponent;

  constructor(private reminderApiService: ReminderApiService) {}

  ngOnInit(): void {}

  handleDeleteReminderChange(visible: boolean) {
    this.show = visible;
  }

  deleteReminder(): void {
    if (this.selectedReminder) {
      this.reminderApiService.delete(this.selectedReminder.uuid).subscribe({
        next: () => {
          ToastNotificationUtil.success(
            "Deletion successful",
            "Successfully deleted reminder!",
            this.queryResultToast
          );
        },
        error: (err) => {
          ToastNotificationUtil.failure(
            "Deletion failed",
            "Cannot delete reminder! Error: " + JSON.stringify(err),
            this.queryResultToast
          );
        },
      });
    } else {
      ToastNotificationUtil.failure(
        "Deletion failed",
        "Cannot delete reminder, as no reminder is currently selected!",
        this.queryResultToast
      );
    }

    if (this.selectedReminder) {
      this.reminderApiService.get(this.selectedReminder.contactId);
    }

    this.handleDeleteReminderChange(false);
  }
}
