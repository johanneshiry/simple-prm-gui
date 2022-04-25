import { ToasterComponent, ToasterPlacement } from "@coreui/angular";
import { ToastNotificationComponent } from "./toast-notification.component";

export class ToastNotificationUtil {
  static success(title: string, body: string, toaster: ToasterComponent) {
    const options = this._options(title, body, {
      color: "success",
      icon: "cil-check",
      iconColorClass: "notification-success-icon",
    });

    toaster.addToast(ToastNotificationComponent, { ...options });
  }

  static failure(title: string, body: string, toaster: ToasterComponent) {
    const options = this._options(title, body, {
      color: "danger",
      icon: "cil-warning",
      iconColorClass: "notification-failure-icon",
    });

    toaster.addToast(ToastNotificationComponent, { ...options });
  }

  private static _options(
    title: string,
    body: string,
    colorAndIcon: { color: string; icon: string; iconColorClass: string }
  ) {
    return {
      title: title,
      body: body,
      delay: 5000,
      placement: ToasterPlacement.TopEnd,
      color: colorAndIcon.color,
      autohide: true,
      icon: colorAndIcon.icon,
      iconColorClass: colorAndIcon.iconColorClass,
    };
  }
}
