"use client";

type Feature = { title: string; desc: string };
type FeaturesDict = {
  title: string;
  f1: Feature;
  f2: Feature;
  f3: Feature;
};

export default function Features({ t }: { t: FeaturesDict }) {
  const items: Feature[] = [t.f1, t.f2, t.f3];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl md:text-3xl font-semibold">{t.title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <article
            key={i}
            className="rounded-2xl border border-white/10 p-5 bg-[rgba(15,22,33,0.6)] backdrop-blur hover:bg-white/[.07] transition"
          >
            <h3 className="font-medium">{it.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{it.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
