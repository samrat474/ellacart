"use client";
import Alert from "@/components/Alert";
import Logo from "@/components/base-app/Logo";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import { useAuth } from "@/lib/auth-context";
import getError from "@/lib/error";
import { AlertCircleIcon, ArrowLeft, KeyIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signIn(data.email, data.password)
      .then(() => {
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        setError(getError(error));
        setLoading(false);
      });
  };

  return (
    <div className="py-12">
      <Container size="md">
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <div className="max-w-fit">
            <Button
              color="secondary"
              variant="bordered"
              icon={ArrowLeft}
              uri="/"
            >
              Go Back
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="mt-6 mb-4">
              <Logo />
            </div>
            <Heading size={3}>Welcome back.</Heading>
            <div className="text-lg text-subtext">
              Sign in to your Ellacart&trade; account.
            </div>
          </div>
          <div className="mt-4"></div>
          <Input
            placeholder="Email"
            icon={MailIcon}
            type="email"
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            required
          />
          <Input
            placeholder="Password"
            icon={KeyIcon}
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            required
          />
          <Checkbox
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          >
            Show password
          </Checkbox>
          <Button type="submit" loading={loading}>
            Sign in
          </Button>
          <Button color="secondary" uri="/auth/sign-up" variant="transparent">
            Don&apos;t have an account? Sign up.
          </Button>
        </form>
        <div className="mt-4">
          {error && (
            <Alert color={"warning"} variant="bordered" icon={AlertCircleIcon}>
              {error}
            </Alert>
          )}
        </div>
      </Container>
    </div>
  );
}
