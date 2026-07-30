const deliverables = [
  {
    title: "Live MVP",
    copy: "A deployed product with the one journey that matters — ready for users, investors, and real feedback.",
  },
  {
    title: "Design system seed",
    copy: "Typography, color, and components structured so the next release does not start from chaos.",
  },
  {
    title: "Founder demo path",
    copy: "A clear narrative through the product — what to show, what to skip, what converts.",
  },
  {
    title: "Build handoff",
    copy: "Repo, environments, and notes so your team (or ours) can continue without rework.",
  },
];

export function DeliverablesSection() {
  return (
    <section
      id="deliverables"
      className="relative border-t border-line"
      aria-labelledby="deliverables-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-signal">
            What you leave with
          </p>
          <h2
            id="deliverables-heading"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-chalk sm:text-4xl"
          >
            Not a prototype deck. A working product.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
            Every sprint ends with something you can click, share, and learn from
            — not another backlog of ideas.
          </p>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {deliverables.map((item) => (
            <li key={item.title} className="border-t border-line pt-6">
              <h3 className="font-display text-xl font-bold text-chalk">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-fog sm:text-base">
                {item.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
