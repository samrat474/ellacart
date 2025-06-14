import Image from "next/image";
import Heading from "./Heading";
import Button from "./Button";
import Link from "next/link";

const Card = ({
  title,
  desc,
  to,
  cover,
  accent,
  buttons,
  large,
  icon,
  pos,
  ...rest
}) => {
  let parentStyle = "rounded-4xl overflow-hidden flex flex-col relative p-2 ";
  let childStyle = "p-6 pt-8 flex flex-col gap-6 ";
  const posStyle = `object-${pos}`;

  const Icon = icon ? icon : "";

  switch (accent) {
    case "primary":
      parentStyle += "bg-primary-transparent-hover/30";
      childStyle += "text-primary-transparent-text";
      break;
    case "success":
      parentStyle += "bg-success-transparent-hover/30";
      childStyle += "text-success-transparent-text";
      break;
    case "warning":
      parentStyle += "bg-warning-transparent-hover/30";
      childStyle += "text-warning-transparent-text";
      break;
    case "danger":
      parentStyle += "bg-danger-transparent-hover/30";
      childStyle += "text-danger-transparent-text";
      break;
    case "secondary":
    default:
      parentStyle += "bg-secondary-transparent-hover/30";
      childStyle += "text-secondary-transparent-text";
  }

  const Component = () => {
    return (
      <div className={parentStyle} {...rest}>
        {cover && (
          <div className="aspect-video w-full rounded-4xl relative overflow-hidden">
            <Image
              src={cover}
              alt={cover}
              fill
              className={`object-cover ${posStyle}`}
            />
          </div>
        )}
        <div className={childStyle}>
          {icon && <Icon size={48} />}
          <Heading size={large ? 5 : 3} colored>
            {title}
          </Heading>
          <div className={large ? "text-xl" : "text-base"}>{desc}</div>
          {buttons && (
            <div className="flex gap-4">
              {buttons.map((button, index) => (
                <Button
                  uri={button.uri}
                  icon={button.icon}
                  color={accent}
                  variant={button.variant}
                  key={index}
                  onClick={null}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return to ? (
    <Link href={to} {...rest}>
      <Component />
    </Link>
  ) : (
    <Component />
  );
};

export default Card;
