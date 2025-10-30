import type { FeaturesDict } from "@/i18n/getDict";

export default function Features({ t }: { t: FeaturesDict }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="text-xl text-slate-200 mb-6">{t.title}</h2>
      <ul className="grid gap-4 md:grid-cols-3">
        {[t.f1, t.f2, t.f3].map((f, i) => (
          <li
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="text-base font-medium">{f.title}</div>
            <p className="text-sm text-slate-400 mt-1">{f.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
