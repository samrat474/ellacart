import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Shop() {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1706372124821-952b522c8961?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shop phones",
      uri: "phones",
    },
    {
      image:
        "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shop laptops",
      uri: "laptops",
    },
    {
      image:
        "https://images.unsplash.com/photo-1696688713460-de12ac76ebc6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shop watches & trackers",
      uri: "watches-trackers",
    },
    {
      image:
        "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shop listening devices",
      uri: "listening",
    },
  ];

  return (
    <Container>
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {data.map((item, index) => (
            <Link href={`/shop/${item.uri}`} key={index}>
              <div className="w-full aspect-video group relative rounded-4xl overflow-hidden">
                <Image
                  src={item.image}
                  fill
                  className="object-cover"
                  alt={item.image}
                />
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all inset-0 bg-black/50 backdrop-blur grid place-items-center">
                  <div className="text-2xl tracking-tighter font-semibold text-white">
                    {item.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
