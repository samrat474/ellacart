const Container = ({ children, size }) => {
  let style = "px-4 mx-auto ";

  switch (size) {
    case "sm":
      style += "max-w-sm";
      break;
    case "md":
      style += "max-w-md";
      break;
    case "lg":
      style += "max-w-lg";
      break;
    case "xl":
      style += "max-w-xl";
      break;
    case "2xl":
      style += "max-w-2xl";
      break;
    case "3xl":
      style += "max-w-3xl";
      break;
    case "4xl":
      style += "max-w-4xl";
      break;
    case "5xl":
      style += "max-w-5xl";
      break;
    case "fluid":
      style += "max-w-[1400px]";
      break;
    case "7xl":
      style += "max-w-7xl";
      break;
    case "6xl":
    default:
      style += "max-w-6xl";
  }

  return <div className={style}>{children}</div>;
};

export default Container;
