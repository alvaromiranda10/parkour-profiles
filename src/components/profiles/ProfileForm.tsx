import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/profiles/useOptimisticProfiles";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";





import { type Profile, insertProfileParams } from "@/lib/db/schema/profiles";
import {
  createProfileAction,
  deleteProfileAction,
  updateProfileAction,
} from "@/lib/actions/profiles";


const ProfileForm = ({
  
  profile,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  profile?: Profile | null;
  
  openModal?: (profile?: Profile) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Profile>(insertProfileParams);
  const editing = !!profile?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("profiles");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Profile },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Profile ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const profileParsed = await insertProfileParams.safeParseAsync({  ...payload });
    if (!profileParsed.success) {
      setErrors(profileParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = profileParsed.data;
    const pendingProfile: Profile = {
      updatedAt: profile?.updatedAt ?? new Date(),
      createdAt: profile?.createdAt ?? new Date(),
      id: profile?.id ?? "",
      userId: profile?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingProfile,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateProfileAction({ ...values, id: profile.id })
          : await createProfileAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingProfile 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={profile?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.idCard ? "text-destructive" : "",
          )}
        >
          Id Card
        </Label>
        <Input
          type="text"
          name="idCard"
          className={cn(errors?.idCard ? "ring ring-destructive" : "")}
          defaultValue={profile?.idCard ?? ""}
        />
        {errors?.idCard ? (
          <p className="text-xs text-destructive mt-2">{errors.idCard[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.phone ? "text-destructive" : "",
          )}
        >
          Phone
        </Label>
        <Input
          type="text"
          name="phone"
          className={cn(errors?.phone ? "ring ring-destructive" : "")}
          defaultValue={profile?.phone ?? ""}
        />
        {errors?.phone ? (
          <p className="text-xs text-destructive mt-2">{errors.phone[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.address ? "text-destructive" : "",
          )}
        >
          Address
        </Label>
        <Input
          type="text"
          name="address"
          className={cn(errors?.address ? "ring ring-destructive" : "")}
          defaultValue={profile?.address ?? ""}
        />
        {errors?.address ? (
          <p className="text-xs text-destructive mt-2">{errors.address[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.salary ? "text-destructive" : "",
          )}
        >
          Salary
        </Label>
        <Input
          type="text"
          name="salary"
          className={cn(errors?.salary ? "ring ring-destructive" : "")}
          defaultValue={profile?.salary ?? ""}
        />
        {errors?.salary ? (
          <p className="text-xs text-destructive mt-2">{errors.salary[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.email ? "text-destructive" : "",
          )}
        >
          Email
        </Label>
        <Input
          type="text"
          name="email"
          className={cn(errors?.email ? "ring ring-destructive" : "")}
          defaultValue={profile?.email ?? ""}
        />
        {errors?.email ? (
          <p className="text-xs text-destructive mt-2">{errors.email[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: profile });
              const error = await deleteProfileAction(profile.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: profile,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default ProfileForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
