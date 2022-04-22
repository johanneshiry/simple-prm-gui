import { Component, Input } from "@angular/core";

import { ClassToggleService, HeaderComponent } from "@coreui/angular";
import { navItems } from "../_nav";

@Component({
  selector: "app-default-header",
  templateUrl: "./default-header.component.html",
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";

  public navItems = navItems;

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(private classToggler: ClassToggleService) {
    super();
  }
}
