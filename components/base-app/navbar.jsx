import { ChevronRight, CircleUserRound, Menu } from "lucide-react";
import Container from "../Container";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../Button";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import Avatar from "boring-avatars";

const Navbar = () => {
  const { user } = useAuth();
  const [showAccount, setShowAccount] = useState(false);

  return (
    <div className="bg-white relative">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Menu size={24} />
            </div>
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          {!user ? (
            <Button uri="/auth/sign-in">Sign in</Button>
          ) : (
            <Button
              icon={CircleUserRound}
              onClick={() => setShowAccount(!showAccount)}
              variant="transparent"
            />
          )}
        </div>
      </Container>
      {showAccount && (
        <div className="absolute top-16 z-50 right-4 min-w-80 bg-white rounded-2xl shadow-lg">
          <div className="p-4 flex items-center gap-4 border-b border-slate-200">
            <span className="h-12 w-12 bg-slate-200 rounded-full grid place-items-center">
              <Avatar name={user.displayName} variant="beam" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-medium text-sm text-subtext">
                {user.displayName}
              </span>
              <span className="text-xs text-subtext">{user.email}</span>
            </span>
            <span>
              <ChevronRight size={24} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
