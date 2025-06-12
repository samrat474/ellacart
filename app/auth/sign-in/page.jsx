"use client";
import Logo from "@/components/base-app/Logo";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, KeyIcon, MailIcon } from "lucide-react";
import { useState } from "react";

export default function SignIn() {
  return (
    <div className="py-12">
      <Container size="md">
        <form className="flex flex-col gap-4">
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
          <div className="flex flex-col items-center">
            <Logo />
            <div className="text-3xl mt-4 font-semibold">Welcome back.</div>
            <div className="text-lg text-subtext">
              Sign in to your Ellacart&trade; account.
            </div>
          </div>
          <div className="mt-4"></div>
          <Input placeholder="Email" icon={MailIcon} type="email" required />
          <Input
            placeholder="Password"
            icon={KeyIcon}
            type="password"
            required
          />
          <Checkbox>Show password</Checkbox>
          <Button type="submit">Sign in</Button>
          <Button color="secondary" uri="/auth/sign-up" variant="transparent">
            Don&apos;t have an account? Sign up.
          </Button>
        </form>
      </Container>
    </div>
  );
}
