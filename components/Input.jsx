const Input = ({ placeholder, type, color, icon, ...rest }) => {
  let style =
    "border-2 border-subtext relative border-secondary rounded group focus-within:ring-2 ";
  let placeholderStyle = `absolute ${
    icon ? "left-13" : "left-4"
  } top-1/2 -translate-y-1/2 group-focus-within:top-3.5 group-focus-within:text-xs text-subtext peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-xs transition-all`;

  switch (color) {
    case "secondary":
      style +=
        "hover:border-secondary-filled focus-within:border-secondary-filled ring-secondary-filled ";
      break;
    case "success":
      style +=
        "hover:border-success-filled focus-within:border-success-filled ring-success-filled ";
      break;
    case "danger":
      style +=
        "hover:border-danger-filled focus-within:border-danger-filled ring-danger-filled ";
      break;
    case "warning":
      style +=
        "hover:border-warning-filled focus-within:border-warning-filled ring-warning-filled ";
      break;
    case "primary":
    default:
      style +=
        "hover:border-primary-filled focus-within:border-primary-filled ring-primary-filled ";
  }

  const Icon = icon ? icon : "";

  return (
    <div className={style} {...rest}>
      {Icon && (
        <span className="absolute top-1/2 left-4 -translate-y-1/2">
          <Icon size={24} />
        </span>
      )}
      <input
        type={type}
        className={`pt-5 py-1 ${
          icon ? "pl-13 pr-4" : "px-4"
        } outline-none bg-transparent w-full relative z-10 peer`}
        placeholder=" "
        {...rest}
      />
      <span className={placeholderStyle}>{placeholder}</span>
    </div>
  );
};

export default Input;
