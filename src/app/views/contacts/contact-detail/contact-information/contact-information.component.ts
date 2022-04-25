import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-contact-information[emails][phones]",
  templateUrl: "./contact-information.component.html",
  styleUrls: ["./contact-information.component.scss"],
})
export class ContactInformationComponent implements OnInit {
  @Input()
  emails!: { type: any; value: string }[] | undefined;

  @Input()
  phones!: { type: string; number: string }[] | undefined;

  constructor() {}

  ngOnInit(): void {}
}
