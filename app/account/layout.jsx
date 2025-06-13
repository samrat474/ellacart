"use client";

import { routeProtected } from "@/lib/auth-routes";

const AccountLayout = ({ children }) => {
  return <>{children}</>;
};

export default routeProtected(AccountLayout);
