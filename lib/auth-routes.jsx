"use client";

import { useEffect } from "react";

const { useRouter } = require("next/navigation");
const { useAuth } = require("./auth-context");

const routeProtected = (Component) => {
  return function withProtected(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/auth/sign-in");
      }
    }, []);

    return <Component user={user} {...props} />;
  };
};

export { routeProtected };
