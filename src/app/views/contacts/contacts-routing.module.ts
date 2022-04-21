import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsListComponent } from "./contacts-list/contacts-list.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { $localize } from "@angular/localize/init";

const routes: Routes = [
  {
    path: "",
    data: {
      title: $localize`Contacts`,
    },
    children: [
      {
        path: "",
        component: ContactsListComponent,
        data: {
          title: "",
        },
      },
      {
        path: ":contact",
        component: ContactDetailComponent,
        // data: {
        //     title: ':contact',
        // },
        // redirectTo: "/contacts/contact-detail"
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
