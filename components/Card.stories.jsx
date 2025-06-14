import Card from "./Card";
import { colors } from "./consts";

export default {
  title: "Card",
  component: Card,
};

export const basic = {
  argTypes: {
    accent: {
      options: colors,
      control: { type: "radio" },
    },
  },
  args: {
    title: "Card title",
    desc: "Some description",
    cover:
      "http://localhost:3000/_next/image?url=https%3A%2F%2Fstore.storeimages.cdn-apple.com%2F1%2Fas-images.apple.com%2Fis%2Fiphone-16-finish-select-202409-6-1inch-ultramarine%3Fwid%3D5120%26hei%3D2880%26fmt%3Dwebp%26qlt%3D70%26.v%3DUXp1U3VDY3IyR1hNdHZwdFdOLzg1V0tFK1lhSCtYSGRqMUdhR284NTN4L28rSU1jVGx4VGxCNEFSdVNXdG1RdzJrQmVLSXFrTCsvY1VvVmRlZkVnMzJKTG1lVWJJT2RXQWE0Mm9rU1V0V0E5L1ZBdzY3RU1aTVdUR3lMZHFNVzE0RzhwM3RLeUk1S0YzTkJVVmF2Ly9R%26traceId%3D1&w=2048&q=75",
    to: "/",
    large: false,
    buttons: [
      ["Shop now", "/shop/1", ""],
      ["Learn more", "/shop/2", "outlined"],
    ],
  },
};
