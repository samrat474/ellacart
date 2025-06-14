const Heading = ({ children, size, colored, ...rest }) => {
  let style = `tracking-tighter font-semibold ${colored && "text-subtext"} `;

  switch (size) {
    case 0:
      style += "text-lg";
      break;
    case 1:
      style += "text-xl";
      break;
    case 3:
      style += "text-3xl";
      break;
    case 4:
      style += "text-4xl";
      break;
    case 5:
      style += "text-5xl";
      break;
    case 6:
      style += "text-6xl";
      break;
    case 2:
    default:
      style += "text-2xl";
  }

  return (
    <h1 className={style} {...rest}>
      {children}
    </h1>
  );
};

export default Heading;
