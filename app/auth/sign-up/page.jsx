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
import { app } from "@/lib/firebase.config";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { AlertCircleIcon, ArrowLeft, KeyIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    password: "",
    retypePassword: "",
  });
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (data.retypePassword !== data.password) {
      setError(
        "Please ensure that the Password and Retype password feilds match.",
      );
      setLoading(false);
    } else {
      signUp(data.email, data.password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: [data.firstName, data.lastName].join(" "),
          })
            .then(() => {
              setDoc(doc(db, "users", user?.user.uid), {
                birthday: new Date(`${data.year}-${data.month}-${data.day}`),
              }).catch((error) => {
                setError(getError(error));
                setLoading(false);
              });
            })
            .then(() => {
              router.push("/");
              setLoading(false);
            });
        })
        .catch((error) => {
          setError(getError(error));
          setLoading(false);
        });
    }
  };

  return (
    <div className="py-12">
      <Container size="md">
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
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
            <Heading size={3}>Hello there.</Heading>
            <div className="text-lg text-subtext">
              Let&apos;s get you started with an Ellacart&trade; account.
            </div>
          </div>
          <div className="mt-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First name"
              required
              type="text"
              value={data.firstName}
              onChange={(e) =>
                setData({
                  ...data,
                  firstName: e.target.value,
                })
              }
            />
            <Input
              placeholder="Last name"
              required
              type="text"
              value={data.lastName}
              onChange={(e) =>
                setData({
                  ...data,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>Your birthday</span>
            <div className="grid grid-cols-4 gap-4">
              <Input
                placeholder="Day"
                min={1}
                max={31}
                required
                type="number"
                value={data.day}
                onChange={(e) =>
                  setData({
                    ...data,
                    day: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Month"
                min={1}
                max={12}
                required
                type="number"
                value={data.month}
                onChange={(e) =>
                  setData({
                    ...data,
                    month: e.target.value,
                  })
                }
              />
              <div className="col-span-2">
                <Input
                  placeholder="Year"
                  min={1900}
                  max={new Date().getFullYear()}
                  required
                  value={data.year}
                  onChange={(e) =>
                    setData({
                      ...data,
                      year: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <Input
            placeholder="Email"
            icon={MailIcon}
            type="email"
            required
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
          />
          <Input
            placeholder="Password"
            icon={KeyIcon}
            type={showPassword ? "text" : "password"}
            required
            value={data.password}
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
          />
          <Input
            placeholder="Retype password"
            icon={KeyIcon}
            type={showPassword ? "text" : "password"}
            required
            value={data.retypePassword}
            onChange={(e) =>
              setData({
                ...data,
                retypePassword: e.target.value,
              })
            }
          />
          <Checkbox
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          >
            Show password
          </Checkbox>
          <Button type="submit" loading={loading}>
            Sign up
          </Button>
          <Button color="secondary" uri="/auth/sign-in" variant="transparent">
            Already have an account? Sign in.
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
