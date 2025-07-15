"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingText } from "@/components/ui/loading-text";
import { MainLogo } from "@/components/ui/main-logo";

import { LoginSchema } from "../schemas/login.type";
import { loginSchema } from "../schemas/login.schema";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data)
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <MainLogo />
            <h1 className="text-xl font-bold">Welcome to SafeScreen</h1>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
            aria-label="Login form"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                      aria-describedby="email-error"
                    />
                  </FormControl>
                  <FormMessage
                    id="email-error"
                    className="text-red-600"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="current-password"
                      aria-describedby="password-error"
                    />
                  </FormControl>
                  <FormMessage
                    id="password-error"
                    className="text-red-600"
                    aria-live="polite"
                  />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? <LoadingText text="Logging in..." /> : "Login"}
            </Button>
          </form>
        </div>
      </Form>

      <p className="text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
