// src/app/(auth)/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import fetchResource, { ApiError } from "@/lib/fetchResource";
import Card from "@/components/ui/card";

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (data: LoginForm) => {
    setErr(null);
    try {
      await fetchResource<{ token: string }>("POST", "login", {
        noAuth: true,
        body: data,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setErr("Email or password is incorrect.");
      } else if (err instanceof ApiError) {
        setErr(
          err.data?.message || "We couldn't sign you in. Please try again."
        );
      } else if (err && typeof err === "object" && "message" in err) {
        setErr(
          String((err as { message?: unknown }).message) || "Unexpected error"
        );
      } else {
        setErr("Unexpected error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-hero-grad text-text-primary">
      <div className="container mx-auto py-10">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">SweatMate</h1>
          <p className="text-sm text-text-secondary mt-1">
            Your Fitness Companion
          </p>
        </header>

        <div className="max-w-md mx-auto">
          {err && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-200"
            >
              {err}
            </div>
          )}

          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-text-secondary mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs text-text-secondary mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className="w-full rounded-xl bg-slate-800/60 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-300">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                disabled={isSubmitting}
                className="w-full rounded-xl bg-accent text-white py-2 text-sm font-medium hover:bg-accent-soft transition disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-[11px] text-text-secondary/80 text-center">
                By continuing you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </Card>
        </div>

        <footer className="mt-8 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} SweatMate
        </footer>
      </div>
    </div>
  );
}
