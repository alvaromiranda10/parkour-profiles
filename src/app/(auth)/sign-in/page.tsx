"use client";

import { signIn } from "next-auth/react";
// import { notFound } from "next/navigation";

const Page = () => {

  // notFound();
  
  return (
    <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10">
      <h1 className="text-2xl font-bold text-center">
        PARKOUR PROFILES APP
      </h1>
      <div className="mt-4">
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="w-full bg-primary text-primary-foreground text-center hover:opacity-90 font-medium px-4 py-2 rounded-lg block"
        >
          Inicia sesión en tu cuenta
        </button>
      </div>
    </main>
  );
};

export default Page;
