import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
} from "@angular/core";
import { ToastComponent, ToasterService } from "@coreui/angular";

@Component({
  selector: "app-toast-notification",
  templateUrl: "./toast-notification.component.html",
  styleUrls: ["./toast-notification.component.scss"],
  providers: [
    {
      provide: ToastComponent,
      useExisting: forwardRef(() => ToastNotificationComponent),
    },
  ],
})
export class ToastNotificationComponent extends ToastComponent {
  @Input() title = "";
  @Input() body = "";
  @Input() icon = "";
  @Input() iconColorClass = "";

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}
