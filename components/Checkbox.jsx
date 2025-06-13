const Checkbox = ({ color, children, ...rest }) => {
  let style = "cursor-pointer focus:ring ring-offset-1 ";

  switch (color) {
    case "secondary":
      style += "accent-secondary-filled ring-secondary-filled";
      break;
    case "success":
      style += "accent-success-filled ring-success-filled";
      break;
    case "warning":
      style += "accent-warning-filled ring-warning-filled";
      break;
    case "danger":
      style += "accent-danger-filled ring-danger-filled";
      break;
    case "primary":
    default:
      style += "accent-primary-filled ring-primary-filled";
  }

  return (
    <span className="flex items-center gap-2 select-none">
      <input id="chk" name="chk" type="checkbox" {...rest} className={style} />
      <label htmlFor="chk" className="cursor-pointer">
        {children}
      </label>
    </span>
  );
};

export default Checkbox;
