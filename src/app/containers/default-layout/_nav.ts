import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    iconComponent: { name: "cil-speedometer" },
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    name: "Contacts",
    url: "/contacts",
    iconComponent: { name: "cil-contact" },
  },
];
