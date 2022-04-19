import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import {ButtonModule, ListGroupModule, ModalModule, PaginationModule} from "@coreui/angular";


@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PaginationModule,
    ListGroupModule,
    ModalModule,
    ButtonModule
  ]
})
export class ContactsModule { }
