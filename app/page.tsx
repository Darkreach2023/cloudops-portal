type CoreApiStatus = {
  service: string;
  status: string;
};

async function getCoreApiStatus(): Promise<CoreApiStatus | null> {
  const apiUrl = process.env.NEXT_PUBLIC_CORE_API_URL;

  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/status`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error connecting to Core API:", error);
    return null;
  }
}

export default async function Home() {
  const coreApiStatus = await getCoreApiStatus();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            CloudOps Lab
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            DevOps & Cloud Architecture Lab
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Plataforma de laboratorio para practicar arquitectura cloud,
            microservicios, Docker, CI/CD, observabilidad y despliegues modernos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Frontend</h2>
            <p className="mt-2 text-zinc-400">cloudops-portal</p>

            <div className="mt-6 rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Framework</p>
              <p className="mt-1 text-lg font-medium">Next.js</p>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Status</p>
              <p className="mt-1 text-lg font-medium text-emerald-400">
                running
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Backend</h2>
            <p className="mt-2 text-zinc-400">core-api</p>

            <div className="mt-6 rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Service</p>
              <p className="mt-1 text-lg font-medium">
                {coreApiStatus?.service ?? "Unavailable"}
              </p>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">API Status</p>
              <p
                className={`mt-1 text-lg font-medium ${
                  coreApiStatus?.status === "running"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {coreApiStatus?.status ?? "offline"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-xl font-semibold">Current Architecture</h2>

          <div className="mt-4 rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
            <p>cloudops-portal → http://localhost:4000/status → core-api</p>
          </div>
        </div>
      </section>
    </main>
  );
}