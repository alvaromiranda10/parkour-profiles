/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Parkour Profiles</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/sign-in"
          >
            <button className="text-sm font-medium hover:underline underline-offset-4">
              Acceder
            </button>
          </Link>
        </nav>
      </header>
      <main className="flex items-center justify-center min-h-screen">
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            PARKOUR<br />
            PROFILES
          </h1>
          <p className="max-w-[600px] mx-auto mt-4 text-neutral-500 md:text-xl dark:text-neutral-400">
            Gestión rápida y clara de perfiles y sueldos para tu equipo de parkour
          </p>
          <div className="mt-6">
            <Link
              href="/sign-in"
            >
              <button
                className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
              >
                Comenzar ahora
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}