import { TriangleAlertIcon } from "lucide-react";
import Alert from "./Alert";
import { colors, variants } from "./consts";

export default {
  title: "Alert",
  component: Alert,
};

export const basic = {
  argTypes: {
    color: {
      options: colors,
      control: { type: "radio" },
    },
    variant: {
      options: variants,
      control: { type: "radio" },
    },
  },
  args: {
    children: "This is an alert",
  },
};

export const withIcon = {
  argTypes: {
    color: {
      options: colors,
      control: { type: "radio" },
    },
    variant: {
      options: variants,
      control: { type: "radio" },
    },
  },
  args: {
    children: "This is an alert!",
    icon: TriangleAlertIcon,
  },
};
