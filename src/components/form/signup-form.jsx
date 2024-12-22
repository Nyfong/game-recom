"use client";
import { useFormState } from "react-dom";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ZodErrors } from "../costom/zod-errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/app/data/actions/auth-actions";
import { ZodError } from "zod";
const INITIAL_STATE = { data: null, ZodError: null, massage: null };
export function SignupForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };
  //useForm
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  );
  console.log(formState, "==> Clienet");
  return (
    <div className="w-full max-w-md">
      {/* onSubmit={handleSubmit} */}
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                // required
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                // required
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                // required
                minLength={6}
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Sign Up
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link
            className="underline ml-2 text-primary hover:text-primary/90"
            href="signin"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
