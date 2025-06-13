import Logo from "@/components/base-app/Logo";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { ArrowLeft, LogIn } from "lucide-react";

const { default: Container } = require("@/components/Container");

const SignOut = () => {
  return (
    <Container size="md">
      <div className="py-24 flex flex-col items-center">
        <Logo />
        <Heading size={3}>Goodbye for now.</Heading>
        <div className="mt-1 text-subtext">
          You have successfully signed out from Ellacart&trade;.
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button
            uri={"/"}
            variant="bordered"
            color="secondary"
            icon={ArrowLeft}
          >
            To home
          </Button>
          <Button uri={"/auth/sign-in"} icon={LogIn}>
            Sign in
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignOut;
