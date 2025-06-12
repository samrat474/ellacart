import Container from "./Container";

export default {
  title: "Container",
  component: Container,
};

export const basic = {
  argTypes: {
    size: {
      options: [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "fluid",
      ],
      control: { type: "radio" },
    },
  },
  args: {
    children:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique ratione neque numquam dolore facere, blanditiis adipisci deserunt voluptatibus corrupti aut, laboriosam soluta consequuntur cumque suscipit. Explicabo quisquam distinctio cupiditate accusamus? Suscipit iusto accusamus magni quasi quaerat eos quo cum natus autem perspiciatis ad sunt vitae at officia non, veritatis provident labore explicabo maiores molestias iste recusandae vel accusantium? Quos, expedita. Quibusdam fuga iusto excepturi necessitatibus corrupti commodi recusandae assumenda ducimus adipisci. A sit nulla dicta nihil quo? Dolorem at similique aut laborum illum tenetur dolores in, animi neque atque. Dolor!",
  },
};
