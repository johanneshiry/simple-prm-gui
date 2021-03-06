import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsListComponent } from "./contacts-list/contacts-list.component";
import {
  AccordionModule,
  AvatarModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  PaginationModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  ToastModule,
} from "@coreui/angular";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { IconModule } from "@coreui/icons-angular";
import {
  NgbAlertModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { ReminderDetailComponent } from "./contact-detail/reminders/reminder-detail/reminder-detail.component";
import { RemindersComponent } from "./contact-detail/reminders/reminders.component";
import { DeleteReminderComponent } from "./contact-detail/reminders/delete-reminder/delete-reminder.component";
import { ContactInformationComponent } from "./contact-detail/contact-information/contact-information.component";
import { AddressesComponent } from "./contact-detail/addresses/addresses.component";

@NgModule({
  declarations: [
    ContactsListComponent,
    ContactDetailComponent,
    ReminderDetailComponent,
    RemindersComponent,
    DeleteReminderComponent,
    ContactInformationComponent,
    AddressesComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PaginationModule,
    ListGroupModule,
    ModalModule,
    ButtonModule,
    GridModule,
    CardModule,
    AvatarModule,
    SpinnerModule,
    TableModule,
    AccordionModule,
    SharedModule,
    IconModule,
    NgbAlertModule,
    FormsModule,
    NgbDatepickerModule,
    DropdownModule,
    FormModule,
    ToastModule,
  ],
})
export class ContactsModule {}
