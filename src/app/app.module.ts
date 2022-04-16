import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStayInTouchComponent } from './components/add-stay-in-touch/add-stay-in-touch.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStayInTouchComponent,
    ContactsListComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
