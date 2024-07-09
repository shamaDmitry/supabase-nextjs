import MainLayout from "@/components/layouts/main-layout";
import ProfileForm from "@/components/profile/profile-form";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { FC } from "react";

interface ProfileRowProps {
  title: string;
  value: string | number | boolean | undefined;
}

const ProfileRow: FC<ProfileRowProps> = ({ title, value }) => {
  return (
    <div className="flex-col flex gap-2 mb-4">
      <span className="font-bold capitalize">{title}</span>
      <span>{value ? value : "-"}</span>
    </div>
  );
};

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = user?.user_metadata;

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container">
          <pre>{JSON.stringify(user?.user_metadata, null, 2)}</pre>

          <h1 className="text-3xl font-bold mb-6">Profile {user?.email}</h1>

          <div className="grid grid-cols-2">
            <div>
              <ProfileRow title="address" value={userData?.address} />
              <ProfileRow title="email" value={userData?.email} />
              <ProfileRow title="firstName" value={userData?.firstName} />
              <ProfileRow title="lastName" value={userData?.lastName} />
              <ProfileRow title="phone" value={user?.phone} />
            </div>

            <div>
              <ProfileForm user={user!} />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
