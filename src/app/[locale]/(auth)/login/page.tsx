"use client";

import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import fetchResource from "@/lib/fetchResource";
import Link from "next/link";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const maybeLocale = pathname.split("/")[1];
  const locale = maybeLocale?.length === 2 ? maybeLocale : "en";

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await fetchResource("POST", "login", {
        noAuth: true,
        body: { email: data.email, password: data.password },
      });

      router.push(`/${locale}/dashboard`);
    } catch (e: unknown) {
      // el fetch puede devolverte distintos formatos, por eso lo protegemos
      const err = e as { data?: { message?: string }; message?: string };
      alert(
        err?.data?.message
          ? err.data.message
          : err?.message
          ? err.message
          : "We couldn't sign you in. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              className="block text-sm text-slate-200 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              className="block text-sm text-slate-200 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition disabled:opacity-60"
          >
            {formState.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href={`/${locale}/auth/signup`}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
