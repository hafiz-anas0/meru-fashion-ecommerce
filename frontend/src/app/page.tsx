export default function Home() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-12">
      <p
        className="mb-4 text-sm uppercase tracking-[0.15em]"
        style={{ color: "var(--accent-primary)" }}
      >
        MERU — Stone & Altitude
      </p>

      <h1
        className="max-w-3xl text-5xl leading-tight md:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        A quieter expression of modern fashion.
      </h1>

      <p
        className="mt-6 max-w-xl text-base leading-7"
        style={{ color: "var(--text-secondary)" }}
      >
        MERU is a modern fashion and lifestyle destination built around
        considered design, everyday elegance, and timeless pieces.
      </p>

      <button
        className="mt-8 px-6 py-3 text-sm text-white transition duration-200 hover:opacity-90"
        style={{ backgroundColor: "var(--accent-secondary)" }}
      >
        Explore MERU
      </button>
    </main>
  );
}