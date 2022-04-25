import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-addresses[addresses]",
  templateUrl: "./addresses.component.html",
  styleUrls: ["./addresses.component.scss"],
})
export class AddressesComponent implements OnInit {
  @Input()
  addresses!:
    | {
        street: string | undefined;
        postalCode: string | undefined;
        location: string | undefined;
        type: any;
      }[]
    | undefined;

  constructor() {}

  ngOnInit(): void {}
}
