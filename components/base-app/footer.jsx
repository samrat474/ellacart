import Image from "next/image";
import Button from "../Button";
import Container from "../Container";
import Heading from "../Heading";
import Links from "../Links";
import Logo from "./Logo";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      heading: "Orders",
      links: [
        {
          text: "Your orders",
          uri: "/account/orders",
        },
        {
          text: "Support",
          uri: "/support",
        },
        {
          text: "Contact us",
          uri: "/support/contact-us",
        },
      ],
    },
    {
      heading: "Resources",
      links: [
        {
          text: "Financing",
          uri: "/resources/financing",
        },
        {
          text: "Exchange program",
          uri: "/resources/exchange-program",
        },
        {
          text: "Ellacart Store",
          uri: "/resources/ellacart-store",
        },
        {
          text: "Blog",
          uri: "/resources/blog",
        },
      ],
    },
    {
      heading: "Sustainability",
      links: [
        {
          text: "Device recycling",
          uri: "/resources/device-recycling",
        },
      ],
    },
  ];

  return (
    <div className="py-12 bg-zinc-50">
      <Container>
        <div className="mb-12 flex items-center gap-2 select-none">
          <span>
            <Logo />
          </span>
          <span className="text-xl font-medium tracking-tighter text-zinc-700">
            Ellacart
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((item, index) => (
            <div className="flex flex-col gap-6" key={index}>
              <Heading size={1}>
                <span className="text-lg">{item.heading}</span>
              </Heading>
              <div className="flex flex-col gap-5 text-sm">
                {item.links.map((item, index) => (
                  <Links uri={item.uri} key={index}>
                    {item.text}
                  </Links>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-6">
            <Heading size={1}>
              <span className="text-lg">Social</span>
            </Heading>
            <div className="flex gap-1">
              {[
                [Twitter, "https://twitter.com/ellacart"],
                [Instagram, "https://instagram.com/ellacart"],
                [Facebook, "https://facebook.com/ellacart"],
                [Youtube, "https://youtube.com/ellacart"],
              ].map(([icon, uri], index) => (
                <Button
                  variant="transparent"
                  color="secondary"
                  key={index}
                  uri={uri}
                  target="_blank"
                  icon={icon}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
