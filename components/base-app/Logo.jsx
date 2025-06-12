import Icon from "@/public/logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="h-6 w-6 relative">
      <Image src={Icon} fill className="object-cover" alt="Icon" />
    </div>
  );
};

export default Logo;
