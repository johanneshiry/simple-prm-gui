import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsListComponent } from "./contacts-list/contacts-list.component";
import {
  AvatarModule,
  ButtonModule,
  CardModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  PaginationModule,
} from "@coreui/angular";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";

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
  ],
})
export class ContactsModule {}
