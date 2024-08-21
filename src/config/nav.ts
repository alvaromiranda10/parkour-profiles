import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Cuenta", icon: User },
  // { href: "/settings", title: "Configuración", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/profiles",
        title: "Profiles",
        icon: Globe,
      },
    ],
  },

];

