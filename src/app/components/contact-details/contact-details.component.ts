import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/contact.model";
import {StayInTouchService} from "../../services/stay-in-touch.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentContact?: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
