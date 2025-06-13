import Link from "next/link";

const Links = ({ children, uri, accent, underlined, colored, ...rest }) => {
  let style = `${
    underlined ? "underline underline-offset-3" : "no-underline"
  } rounded `;

  switch (accent) {
    case "secondary":
      style += `${
        colored
          ? "text-secondary-transparent-text hover:bg-secondary-transparent-hover"
          : "hover:text-secondary-transparent-text"
      }`;
      break;
    case "success":
      style += `${
        colored
          ? "text-success-transparent-text hover:bg-success-transparent-hover"
          : "hover:text-success-transparent-text"
      }`;
      break;
    case "warning":
      style += `${
        colored
          ? "text-warning-transparent-text hover:bg-warning-transparent-hover"
          : "hover:text-warning-transparent-text"
      }`;
      break;
    case "danger":
      style += `${
        colored
          ? "text-danger-transparent-text hover:bg-danger-transparent-hover"
          : "hover:text-danger-transparent-text"
      }`;
      break;
    case "primary":
    default:
      style += `${
        colored
          ? "text-primary-transparent-text hover:bg-primary-transparent-hover"
          : "hover:text-primary-transparent-text"
      }`;
  }

  return (
    <Link href={uri} {...rest}>
      <span className={style}>{children}</span>
    </Link>
  );
};

export default Links;
