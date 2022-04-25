import { NgModule } from "@angular/core";
import { ToastNotificationComponent } from "./toast-notification/toast-notification.component";
import { GridModule, ToastModule } from "@coreui/angular";
import { IconModule } from "@coreui/icons-angular";

@NgModule({
  declarations: [ToastNotificationComponent],
  imports: [ToastModule, IconModule, GridModule],
})
export class CommonModule {}
