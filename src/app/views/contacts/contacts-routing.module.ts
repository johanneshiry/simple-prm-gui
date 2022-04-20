import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactsListComponent} from "./contacts-list/contacts-list.component";

const routes: Routes = [
  {
    path: '',
    component: ContactsListComponent,
    data: {
      title: $localize`Contacts`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
