"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface ProfileFormProps {
  user: User;
}

const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
  const supabase = createClient();

  const [updating, setUpdating] = useState(false);
  const [phone, setPhone] = useState(user.phone);

  const updateProfile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUpdating(true);
    e.preventDefault();

    try {
      const updates = {
        id: user.id,
        // phone,
        updated_at: new Date(),
        data: {
          avatar_url: "test adress",
        },
      };

      let { error } = await supabase.auth.updateUser(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground lg:max-w-screen-sm">
      <label className="text-md" htmlFor="avatar">
        Avatar
      </label>

      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="avatar"
        required
        type="file"
      />

      <label className="text-md" htmlFor="phone">
        Phone
      </label>

      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="phone"
        required
        placeholder="Phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button
        className="capitalize"
        variant={"secondary"}
        disabled={updating}
        onClick={(e) => updateProfile(e)}
      >
        {updating ? "Updating..." : "save"}
      </Button>
    </form>
  );
};

export default ProfileForm;
