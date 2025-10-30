// src/app/[locale]/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import fetchResource, { ApiError } from "@/lib/fetchResource";
import { setUserToken } from "@/lib/auth";
import { isLocale, type Locale } from "@/i18n/locales";

const LOGO =
  "https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png";

// ⚠️ Ajusta estos campos a los que espera TU backend. He dejado los más comunes.
// Si tu endpoint necesita más (p. ej. phone, plan, etc.), solo añade inputs y se enviarán en body.
type SignUpForm = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
};

export default function SignUpPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = (
    isLocale(pathname.split("/")[1]) ? pathname.split("/")[1] : "en"
  ) as Locale;

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({ defaultValues: { acceptTerms: true } });

  const onSubmit = async (data: SignUpForm) => {
    setErr(null);
    setOkMsg(null);

    // Validación de confirmación
    if (data.password !== data.confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      // 👉 Ajusta la ruta si en tu API es otra (p. ej. "auth/signup")
      const res = await fetchResource<{ token?: string; user?: unknown }>(
        "POST",
        "signup",
        {
          noAuth: true,
          body: {
            // Mapea los nombres si tu backend usa otros (p. ej. name en lugar de firstName/lastName)
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            acceptTerms: data.acceptTerms,
          },
        }
      );

      if (res?.token) {
        try {
          setUserToken?.(res.token);
        } catch {
          localStorage.setItem("token", res.token);
        }
        // Redirige al dashboard tras registro
        router.push(`/${locale}/dashboard`);
      } else {
        // Si tu API devuelve 200 sin token, muestra confirmación y deja que inicie sesión:
        setOkMsg("Your account has been created. Please log in.");
        // router.push(`/${locale}/auth/login`);
      }
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        const msg =
          // @ts-expect-error data suelta del backend
          e.data?.message ||
          (e.status === 409 ? "Email already in use." : "Could not sign up.");
        setErr(msg);
      } else {
        setErr("Unexpected error");
      }
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl bg-[rgba(11,15,20,0.6)] ring-1 ring-white/10 shadow-soft p-6 md:p-10 backdrop-blur">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO}
              alt="SweatMate"
              width={80}
              height={24}
              priority
              className="rounded-md"
            />
          </div>
          <Link
            href={`/${locale}/auth/login`}
            className="text-xs rounded-full border border-white/10 px-3 py-1.5 text-slate-300 hover:bg-white/5"
          >
            Log in
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Create your account
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Start free — no credit card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm mb-2">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full rounded-xl bg-slate-800/60 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                {...register("firstName")}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm mb-2">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full rounded-xl bg-slate-800/60 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl bg-slate-800/60 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
              aria-invalid={!!errors.email}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                className="w-full rounded-xl bg-slate-800/60 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                aria-invalid={!!errors.password}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min length is 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm mb-2">
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPass2 ? "text" : "password"}
                autoComplete="new-password"
                className="w-full rounded-xl bg-slate-800/60 ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 px-3 py-2"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) =>
                    v === watch("password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass2((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5"
              >
                {showPass2 ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <label className="mt-5 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-900"
              {...register("acceptTerms")}
            />
            <span className="text-slate-300">
              I accept the Terms and Privacy Policy.
            </span>
          </label>

          {err && (
            <div
              role="alert"
              className="mb-4 mt-4 rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-200"
            >
              {err}
            </div>
          )}
          {okMsg && (
            <div
              role="status"
              className="mb-4 mt-4 rounded-lg border border-emerald-500/40 px-3 py-2 text-sm text-emerald-200"
            >
              {okMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-accent px-3 py-3 text-sm font-medium text-white ring-1 ring-accent/20 hover:bg-accent/90 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href={`/${locale}/login`}
            className="text-accent hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
