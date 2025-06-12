const Alert = ({ children, icon, color, variant, ...rest }) => {
  let style = "rounded px-4 py-3 border-2 font-medium flex items-start gap-4 ";
  switch (color) {
    case "secondary":
      switch (variant) {
        case "bordered":
          style +=
            "border-secondary-bordered-text bg-secondary-bordered-hover text-secondary-bordered-text";
          break;
        case "transparent":
          style +=
            "border-secondary-transparent-hover bg-secondary-transparent-hover text-secondary-transparent-text";
          break;
        case "secondary":
        default:
          style +=
            "border-secondary-filled bg-secondary-filled text-secondary-filled-text";
      }
      break;
    case "success":
      switch (variant) {
        case "bordered":
          style +=
            "border-success-bordered-text bg-success-bordered-hover text-success-bordered-text";
          break;
        case "transparent":
          style +=
            "border-success-transparent-hover bg-success-transparent-hover text-success-transparent-text";
          break;
        case "success":
        default:
          style +=
            "border-success-filled bg-success-filled text-success-filled-text";
      }
      break;
    case "warning":
      switch (variant) {
        case "bordered":
          style +=
            "border-warning-bordered-text bg-warning-bordered-hover text-warning-bordered-text";
          break;
        case "transparent":
          style +=
            "border-warning-transparent-hover bg-warning-transparent-hover text-warning-transparent-text";
          break;
        case "warning":
        default:
          style +=
            "border-warning-filled bg-warning-filled text-warning-filled-text";
      }
      break;
    case "danger":
      switch (variant) {
        case "bordered":
          style +=
            "border-danger-bordered-text bg-danger-bordered-hover text-danger-bordered-text";
          break;
        case "transparent":
          style +=
            "border-danger-transparent-hover bg-danger-transparent-hover text-danger-transparent-text";
          break;
        case "danger":
        default:
          style +=
            "border-danger-filled bg-danger-filled text-danger-filled-text";
      }
      break;
    case "primary":
    default:
      switch (variant) {
        case "bordered":
          style +=
            "border-primary-bordered-text bg-primary-bordered-hover text-primary-bordered-text";
          break;
        case "transparent":
          style +=
            "border-primary-transparent-hover bg-primary-transparent-hover text-primary-transparent-text";
          break;
        case "primary":
        default:
          style +=
            "border-primary-filled bg-primary-filled text-primary-filled-text";
      }
  }

  const Icon = icon ? icon : "";

  return (
    <div className={style} {...rest}>
      {icon && (
        <span>
          <Icon size={24} />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
