export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-space-6 py-space-9">
        <p className="font-mono text-mono-label uppercase text-faint">
          SprintZero Studios
        </p>
        <h1 className="mt-space-3 font-display text-display-l text-text">
          Blank slate
        </h1>
        <p className="mt-space-3 max-w-md text-body text-muted">
          Foundation ready. Preview{" "}
          <a
            href="/tokens"
            className="border-b border-accent-underline pb-[2px] font-medium text-accent transition-colors duration-fast ease-sz hover:border-accent-hover hover:text-accent-hover"
          >
            tokens
          </a>{" "}
          and{" "}
          <a
            href="/components"
            className="border-b border-accent-underline pb-[2px] font-medium text-accent transition-colors duration-fast ease-sz hover:border-accent-hover hover:text-accent-hover"
          >
            components
          </a>
          .
        </p>
      </div>
    </main>
  );
}
