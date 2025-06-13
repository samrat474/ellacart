import { colors } from "./consts";
import Links from "./Links";

export default {
  title: "Link",
  component: Links,
};

export const basic = {
  argTypes: {
    accent: {
      options: colors,
      control: { type: "radio" },
    },
  },
  args: {
    children: "Click me",
    uri: "#",
    underlined: false,
    colored: false,
  },
};
