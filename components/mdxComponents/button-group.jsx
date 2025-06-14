import Button from "../Button";

const ButtonGroup = ({ data, ...rest }) => {
  return (
    <div className="flex items-center gap-4">
      {data.map(([text, color, variant, uri, icon], index) => (
        <Button
          color={color}
          variant={variant}
          uri={uri}
          icon={icon}
          key={index}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
