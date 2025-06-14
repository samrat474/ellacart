import Image from "next/image";

const ImageComponent = ({ src, crop, pos, ...rest }) => {
  const posStyle = `object-${pos}`;

  return (
    <div className="w-full aspect-square relative rounded-4xl overflow-hidden flex-1">
      <Image
        src={src}
        alt={src}
        fill
        className={`object-cover ${crop ? "scale-150" : "scale-100"} ${posStyle}`}
        {...rest}
      />
    </div>
  );
};

export default ImageComponent;
