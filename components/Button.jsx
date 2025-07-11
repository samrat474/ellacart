import { Loader } from "lucide-react";
import Link from "next/link";

const Button = ({ color, variant, children, icon, uri, loading, ...rest }) => {
  let style = `cursor-pointer p-2 rounded font-semibold border-2 active:opacity-95 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed text-nowrap `;

  switch (color) {
    case "secondary":
      switch (variant) {
        case "bordered":
          style +=
            "border-secondary-bordered-text bg-transparent text-secondary-bordered-text hover:bg-secondary-bordered-hover ";
          break;
        case "transparent":
          style +=
            "border-transparent bg-transparent text-secondary-transparent-text hover:border-secondary-transparent-hover hover:bg-secondary-transparent-hover ";
          break;
        case "filled":
        default:
          style +=
            "border-secondary-filled bg-secondary-filled text-secondary-filled-text hover:border-secondary-filled-hover hover:bg-secondary-filled-hover";
      }
      break;
    case "success":
      switch (variant) {
        case "bordered":
          style +=
            "border-success-bordered-text bg-transparent text-success-bordered-text hover:bg-success-bordered-hover ";
          break;
        case "transparent":
          style +=
            "border-transparent bg-transparent text-success-transparent-text hover:border-success-transparent-hover hover:bg-success-transparent-hover ";
          break;
        case "filled":
        default:
          style +=
            "border-success-filled bg-success-filled text-success-filled-text hover:border-success-filled-hover hover:bg-success-filled-hover";
      }
      break;
    case "danger":
      switch (variant) {
        case "bordered":
          style +=
            "border-danger-bordered-text bg-transparent text-danger-bordered-text hover:bg-danger-bordered-hover ";
          break;
        case "transparent":
          style +=
            "border-transparent bg-transparent text-danger-transparent-text hover:border-danger-transparent-hover hover:bg-danger-transparent-hover ";
          break;
        case "filled":
        default:
          style +=
            "border-danger-filled bg-danger-filled text-danger-filled-text hover:border-danger-filled-hover hover:bg-danger-filled-hover";
      }
      break;
    case "warning":
      switch (variant) {
        case "bordered":
          style +=
            "border-warning-bordered-text bg-transparent text-warning-bordered-text hover:bg-warning-bordered-hover ";
          break;
        case "transparent":
          style +=
            "border-transparent bg-transparent text-warning-transparent-text hover:border-warning-transparent-hover hover:bg-warning-transparent-hover ";
          break;
        case "filled":
        default:
          style +=
            "border-warning-filled bg-warning-filled text-warning-filled-text hover:border-warning-filled-hover hover:bg-warning-filled-hover";
      }
      break;
    case "primary":
    default:
      switch (variant) {
        case "bordered":
          style +=
            "border-primary-bordered-text bg-transparent text-primary-bordered-text hover:bg-primary-bordered-hover ";
          break;
        case "transparent":
          style +=
            "border-transparent bg-transparent text-primary-transparent-text hover:border-primary-transparent-hover hover:bg-primary-transparent-hover ";
          break;
        case "filled":
        default:
          style +=
            "border-primary-filled bg-primary-filled text-primary-filled-text hover:border-primary-filled-hover hover:bg-primary-filled-hover  ";
      }
  }

  const Icon = icon ? icon : "";

  const Loading = () => {
    return (
      <span className="animate-spin">
        <Loader size={24} />
      </span>
    );
  };

  return uri ? (
    <Link href={uri} {...rest} className="flex flex-col">
      <button className={style} {...rest} disabled={loading}>
        {!loading ? (
          <>
            <>
              {Icon && (
                <span className={children && "pl-1"}>
                  <Icon size={24} />
                </span>
              )}
            </>
            <>{children && <span className="px-2">{children}</span>}</>
          </>
        ) : (
          <Loading />
        )}
      </button>
    </Link>
  ) : (
    <button className={style} {...rest} disabled={loading}>
      {!loading ? (
        <>
          <>
            {Icon && (
              <span className={children && "pl-1"}>
                <Icon size={24} />
              </span>
            )}
          </>
          <>{children && <span className="px-2">{children}</span>}</>
        </>
      ) : (
        <Loading />
      )}
    </button>
  );
};

export default Button;
