export const dynamic = "force-dynamic";

type CoreApiStatus = {
  service: string;
  status: string;
};

type User = {
  id: number;
  name: string;
  role: string;
};

type UsersSummary = {
  service: string;
  source: string;
  usersCount: number;
  users: User[];
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

async function getUsersSummary(): Promise<UsersSummary | null> {
  const apiUrl = process.env.NEXT_PUBLIC_CORE_API_URL;

  if (!apiUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/users-summary`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error connecting to Users Summary:", error);
    return null;
  }
}

export default async function Home() {
  const coreApiStatus = await getCoreApiStatus();
  const usersSummary = await getUsersSummary();

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
          <h2 className="text-xl font-semibold">Users Summary</h2>
          <p className="mt-2 text-zinc-400">
            Data coming from core-api through users-api.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Source</p>
              <p className="mt-1 text-lg font-medium">
                {usersSummary?.source ?? "Unavailable"}
              </p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-500">Users Count</p>
              <p className="mt-1 text-lg font-medium text-emerald-400">
                {usersSummary?.usersCount ?? 0}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Users</p>

            <div className="mt-3 space-y-3">
              {usersSummary?.users?.length ? (
                usersSummary.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-zinc-100">{user.name}</p>
                      <p className="text-sm text-zinc-500">ID: {user.id}</p>
                    </div>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-cyan-300">
                      {user.role}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500">No users available</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <h2 className="text-xl font-semibold">Current Architecture</h2>

          <div className="mt-4 rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
            <p>
              cloudops-portal → {process.env.NEXT_PUBLIC_CORE_API_URL}
              /users-summary → core-api → users-api
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}