import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsListComponent } from "./contacts-list/contacts-list.component";
import {
  AccordionModule,
  AvatarModule,
  ButtonModule,
  CardModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  PaginationModule,
  SharedModule,
  SpinnerModule,
  TableModule,
} from "@coreui/angular";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { IconModule } from "@coreui/icons-angular";

@NgModule({
  declarations: [ContactsListComponent, ContactDetailComponent],
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
  ],
})
export class ContactsModule {}
