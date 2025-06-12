import Checkbox from "./Checkbox";
import { colors } from "./consts";

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const basic = {
  argTypes: {
    color: {
      options: colors,
      control: { type: "radio" },
    },
  },
  args: {
    children: "Label",
  },
};
