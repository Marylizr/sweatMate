// src/app/[locale]/(auth)/forgot-password/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import fetchResource, { ApiError } from "@/lib/fetchResource";
import { isLocale, type Locale } from "@/i18n/locales";

const LOGO =
  "https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png";

type ForgotForm = { email: string };

export default function ForgotPasswordPage() {
  const pathname = usePathname();
  const locale = (
    isLocale(pathname.split("/")[1]) ? pathname.split("/")[1] : "en"
  ) as Locale;

  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>();

  const onSubmit = async (data: ForgotForm) => {
    setErr(null);
    setOkMsg(null);
    try {
      // 👉 Ajusta la ruta a la que uses en tu API (p. ej. "auth/forgot-password")
      await fetchResource<void>("POST", "forgot-password", {
        noAuth: true,
        body: data,
      });

      setOkMsg(
        "If an account exists for this email, we’ve sent instructions to reset your password."
      );
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        const msg =
          // @ts-expect-error data del backend
          e.data?.message || "We couldn’t process your request.";
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
            href={`/${locale}/login`}
            className="text-xs rounded-full border border-white/10 px-3 py-1.5 text-slate-300 hover:bg-white/5"
          >
            Back to login
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Forgot password
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
          )}

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
            {isSubmitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}
