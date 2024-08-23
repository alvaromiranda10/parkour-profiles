"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Profile, CompleteProfile } from "@/lib/db/schema/profiles";
import Modal from "@/components/shared/Modal";

import { useOptimisticProfiles } from "@/app/(app)/profiles/useOptimisticProfiles";
import { Button } from "@/components/ui/button";
import ProfileForm from "./ProfileForm";
import { PlusIcon } from "lucide-react";
import { ProfileFilterList } from "./ProfileFilterList";

type TOpenModal = (profile?: Profile) => void;

export default function ProfileList({
  profiles,
}: {
  profiles: CompleteProfile[];
}) {
  const { optimisticProfiles, addOptimisticProfile } = useOptimisticProfiles(
    profiles,
  );
  const [open, setOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const openModal = (profile?: Profile) => {
    setOpen(true);
    profile ? setActiveProfile(profile) : setActiveProfile(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeProfile ? "Editar Profile" : "Crear Profile"}
      >
        <ProfileForm
          profile={activeProfile}
          addOptimistic={addOptimisticProfile}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Modal>
      <div className="absolute right-0 top-0 flex space-x-2">
        <Link href={"/profiles/stats"} className="right-1">
          <Button variant={"outline"}>
            Estadísticas
          </Button>
        </Link>
        <Button onClick={() => openModal()} >
          +
        </Button>
      </div>
      {optimisticProfiles.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ProfileFilterList data={optimisticProfiles} />
      )}
    </div>
  );
}

export const CustomButtonProfile = ({
  profile,
}: {
  profile: CompleteProfile;
}) => {
  const optimistic = profile.id === "optimistic";
  const deleting = profile.id === "delete";
  const mutating = optimistic || deleting;


  return (
    <Button
      variant={"link"}
      className={cn(
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
      asChild
    >
      <Link
        href={mutating ? "#" : "/profiles/" + profile.id}
      >
        Editar
      </Link>
    </Button>
  );
};

const Profile = ({
  profile,
  openModal,
}: {
  profile: CompleteProfile;
  openModal: TOpenModal;
}) => {
  const optimistic = profile.id === "optimistic";
  const deleting = profile.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("profiles")
    ? pathname
    : pathname + "/profiles/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{profile.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + profile.id}>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No hay perfiles
      </h3>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Nuevo Perfil </Button>
      </div>
    </div>
  );
};
