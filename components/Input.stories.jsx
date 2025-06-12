import { MailIcon } from "lucide-react";
import Input from "./Input";
import { colors, inputTypes } from "./consts";

export default {
  title: "Input",
  component: Input,
};

export const basic = {
  argTypes: {
    color: {
      options: colors,
      control: { type: "radio" },
    },
    type: {
      options: inputTypes,
      control: { type: "radio" },
    },
  },
  args: {
    placeholder: "Type something",
  },
};

export const withIcon = {
  argTypes: {
    color: {
      options: colors,
      control: { type: "radio" },
    },
    type: {
      options: inputTypes,
      control: { type: "radio" },
    },
  },
  args: {
    placeholder: "Enter email",
    icon: MailIcon,
  },
};
