"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useForm, SubmitHandler } from "react-hook-form";
import PlainError from "@/components/errors/plain-error";
import Spinner from "../spinner";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
  user: User;
}

type Inputs = {
  address: string;
  firstName: string;
  lastName: string;
  avatar: FileList;
};

const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: user.user_metadata.firstName,
      lastName: user.user_metadata.lastName,
      address: user.user_metadata.address,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setUpdating(true);

    let avatarSrc = null;
    const avatarFile = formData.avatar[0];
    const { firstName, lastName, address } = formData;

    if (avatarFile) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`avatars/${avatarFile.name}`, avatarFile, {
          cacheControl: "3600",
          upsert: true,
        });

      avatarSrc = data?.path;

      if (error) {
        toast({
          description: <PlainError message={JSON.stringify(error, null, 2)} />,
        });

        setUpdating(false);

        return;
      }
    }

    try {
      const avatar = { avatar_url: `${avatarSrc}` };

      const updates = {
        id: user.id,
        updated_at: new Date(),
        data: {
          ...(avatarSrc && avatar),
          firstName,
          lastName,
          address,
        },
      };

      let { data, error } = await supabase.auth.updateUser(updates);

      if (data) {
        toast({
          description: (
            <div className="text-green-500">
              <p className="mb-2 font-bold text-lg">Success</p>

              <span className="font-mono">
                {JSON.stringify(data.user?.user_metadata, null, 2)}
              </span>
            </div>
          ),
        });
      }

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setUpdating(false);
      router.refresh();
    }
  };

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-6 text-foreground lg:max-w-screen-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="text-md" htmlFor="firstName">
          First name
        </label>

        <input
          id="firstName"
          disabled={updating}
          className={cn({
            "rounded-md px-4 py-2 bg-inherit border": true,
            "opacity-50": updating,
          })}
          {...register("firstName", {
            required: { value: true, message: "The first name is required" },
          })}
        />

        {errors.firstName && <PlainError message={errors.firstName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md" htmlFor="lastName">
          Last name
        </label>

        <input
          id="lastName"
          className={cn({
            "rounded-md px-4 py-2 bg-inherit border": true,
            "opacity-50": updating,
          })}
          {...register("lastName", {
            required: { value: true, message: "The lastName is required" },
          })}
        />
        {errors.lastName && <PlainError message={errors.lastName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md" htmlFor="address">
          address
        </label>

        <input
          id="address"
          className={cn({
            "rounded-md px-4 py-2 bg-inherit border": true,
            "opacity-50": updating,
          })}
          {...register("address", {
            required: { value: true, message: "The address is required" },
          })}
        />
        {errors.address && <PlainError message={errors.address.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md" htmlFor="avatar">
          Avatar
        </label>

        <input
          id="avatar"
          type="file"
          disabled={updating}
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("avatar")}
        />
      </div>

      <Button variant={"secondary"} disabled={updating} type="submit">
        {updating ? (
          <Spinner className="size-5" />
        ) : (
          <span className="capitalize text-lg font-bold">save</span>
        )}
      </Button>
    </form>
  );
};

export default ProfileForm;
