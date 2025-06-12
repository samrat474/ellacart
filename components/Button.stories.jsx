import { HomeIcon } from "lucide-react";
import Button from "./Button";
import { colors, variants } from "./consts";

export default {
  title: "Button",
  component: Button,
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
    children: "Button",
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
    children: "Button",
    icon: HomeIcon,
  },
};

export const icon = {
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
    icon: HomeIcon,
  },
};
