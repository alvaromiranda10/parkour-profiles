"use client";
import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function UpdateNameCard({ name }: { name: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { name } = Object.fromEntries(form.entries()) as { name: string };
    if (name.length < 3) {
      toast.error("El nombre debe tener más de 3 caracteres.");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200)
        toast.success("¡Nombre actualizado exitosamente!");
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: "Su Nombre",
        description:
          "Ingrese su nombre completo o un nombre para mostrar con el que se sienta cómodo.",
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <Input defaultValue={name ?? ""} name="name" disabled={isPending} />
        </AccountCardBody>
        <AccountCardFooter description="64 caracteres máximo">
          <Button disabled={isPending}>Actualizar nombre</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
