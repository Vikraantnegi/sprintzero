export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.18em] uppercase text-chalk">
            SprintZero Studios
          </p>
          <p className="mt-2 text-sm text-fog">
            MVPs shipped in 72 hours. Built for founders who move.
          </p>
        </div>
        <p className="font-mono text-xs text-fog">
          © {new Date().getFullYear()} SprintZero Studios
        </p>
      </div>
    </footer>
  );
}
