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
          Foundation ready. Preview tokens at{" "}
          <a href="/tokens" className="text-accent hover:text-accent-hover">
            /tokens
          </a>
          .
        </p>
      </div>
    </main>
  );
}
