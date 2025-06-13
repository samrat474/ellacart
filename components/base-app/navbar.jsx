import {
  BadgeDollarSign,
  Cable,
  ChevronRight,
  CircleUserRound,
  CircleX,
  Headphones,
  Laptop,
  LifeBuoy,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Smartphone,
  Watch,
  X,
} from "lucide-react";
import Container from "../Container";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../Button";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { useRouter } from "next/navigation";
import Links from "../Links";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showAccount, setShowAccount] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const changeNavProp = () => {
    window.scrollY >= 10 ? setScrolled(true) : setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavProp);
    return () => {
      window.removeEventListener("scroll", changeNavProp);
    };
  }, []);

  const sideNav = [
    {
      icon: Package,
      text: "Orders",
      uri: "/account/orders",
    },
    {
      icon: Settings,
      text: "Settings",
      uri: "/account/settings",
    },
  ];

  const mainNav = [
    {
      icon: Smartphone,
      text: "Phones",
      uri: "/shop/phones",
    },
    {
      icon: Laptop,
      text: "Laptops",
      uri: "/shop/laptops",
    },
    {
      icon: Watch,
      text: "Watches & Trackers",
      uri: "/shop/watches",
    },
    {
      icon: Headphones,
      text: "Listening",
      uri: "/shop/listening",
    },
    {
      icon: Cable,
      text: "Accessories",
      uri: "/shop/accessories",
    },
    {
      icon: BadgeDollarSign,
      text: "Offers",
      uri: "/offers",
    },
  ];

  const router = useRouter();

  const handleSignOut = () => {
    logOut().then(() => {
      router.push("/auth/sign-out");
    });
  };

  const HorNavLinks = ({ uri, text, icon, lg, ...rest }) => {
    const Icon = icon;

    return (
      <Link href={uri} {...rest}>
        <div className="py-4 px-6 hover:bg-secondary-transparent-hover flex items-center gap-4 text-subtext">
          <span>
            <Icon size={lg ? 24 : 22} />
          </span>
          <span className={lg ? "text-base" : "text-sm"}>{text}</span>
        </div>
      </Link>
    );
  };

  const AccountNav = () => {
    return (
      <div
        className="absolute top-17 z-50 right-0 min-w-72 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden transition-all"
        onClick={() => setShowAccount(false)}
      >
        <div className="py-2 border-b border-zinc-200">
          <Link href="/account">
            <div className="flex px-6 py-2 items-center gap-4 select-none hover:bg-secondary-transparent-hover">
              <span className="h-12 w-12 bg-zinc-200 rounded-full grid place-items-center">
                <Avatar name={user.displayName} variant="beam" />
              </span>
              <span className="flex flex-col">
                <span className="font-medium text-sm text-subtext">
                  {user.displayName}
                </span>
                <span className="text-xs text-subtext">{user.email}</span>
              </span>
              <span>
                <ChevronRight size={24} />
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col py-2 border-b border-zinc-200">
          {sideNav.map((item, index) => (
            <HorNavLinks
              key={index}
              text={item.text}
              uri={item.uri}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="py-2">
          <button
            className="py-4 px-6 hover:bg-secondary-transparent-hover flex items-center gap-4 text-danger-transparent-text w-full cursor-pointer"
            onClick={handleSignOut}
          >
            <span>
              <LogOut size={22} />
            </span>
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </div>
    );
  };

  const MenuNav = () => {
    return (
      <div
        className="fixed z-40 inset-x-0 top-16 bottom-0 bg-white py-4"
        onClick={() => setShowMenu(false)}
      >
        <div className="flex flex-col gap-0 tracking-tight mb-2 pb-2 border-b border-zinc-200">
          {mainNav.map((item, index) => (
            <HorNavLinks
              icon={item.icon}
              key={index}
              text={item.text}
              uri={item.uri}
              lg
            />
          ))}
        </div>
        <div className="flex flex-col tracking-tight">
          {[
            [Package, "Your orders", "/account/orders"],
            [Settings, "Account settings", "/account/settings"],
            [LifeBuoy, "Support", "/support"],
          ].map(([icon, text, uri], index) => (
            <HorNavLinks icon={icon} text={text} uri={uri} key={index} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`bg-white sticky top-0 z-50 transition-all ${
        scrolled && "shadow-[0_2px_15px_rgba(0,0,0,0.1)]"
      }`}
    >
      <Container size="fluid">
        <div className="h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-6">
            <div className="lg:hidden">
              <Button
                icon={showMenu ? X : Menu}
                variant="transparent"
                color="secondary"
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
            <Link href={"/"}>
              <Logo />
            </Link>
            <div className="lg:flex items-center gap-6 hidden text-sm">
              {mainNav.map((item, index) => (
                <Links uri={item.uri} key={index}>
                  {item.text}
                </Links>
              ))}
            </div>
          </div>
          {!user ? (
            <Button uri="/auth/sign-in">Sign in</Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                icon={ShoppingBag}
                uri="/cart"
                variant="transparent"
                color="secondary"
              />
              <button
                onClick={() => setShowAccount(!showAccount)}
                className="h-10 w-10 relative overflow-hidden rounded-full cursor-pointer"
              >
                <Avatar name={user?.displayName} variant="beam" />
                {showAccount && (
                  <span className="absolute inset-0 bg-white/60 grid place-items-center backdrop-blur">
                    <X size={24} />
                  </span>
                )}
              </button>
            </div>
          )}
          {showAccount && user && <AccountNav />}
        </div>
      </Container>
      {showMenu && <MenuNav />}
    </div>
  );
};

export default Navbar;
