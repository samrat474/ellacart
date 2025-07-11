import Link from "next/link";
import Button from "./Button";
import Heading from "./Heading";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ title, id, price, image, ...rest }) {
  return (
    <Link
      href={`/product/${id}`}
      className="last-of-type:border-b last-of-type:border-r border-slate-300 group hover:shadow-2xl transition-all h-full"
    >
      <div className="flex flex-col gap-6 justify-between p-8">
        <div className="w-full mx-auto aspect-square relative group-hover:opacity-70">
          <Image
            src={image.split(";")[0]}
            fill
            className="object-contain"
            alt={image}
          />
        </div>
        <div className="w-full line-clamp-2 group-hover:text-primary-filled">
          <Heading size={1}>{title}</Heading>
        </div>
        <div className="flex flex-col gap-0">
          <strike className="text-xs text-teal-700">
            ${parseInt(1.25 * price)}
          </strike>
          <div className="text-2xl font-medium">${price}</div>
        </div>
      </div>
    </Link>
  );
}
