import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

interface AuthButtonProps {
  user: User | null;
}

const AuthButton: FC<AuthButtonProps> = ({ user }) => {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Link href="/profile" className="hover:underline">
        Hey, {user.email}!
      </Link>

      {user.user_metadata.avatar_url && (
        <div className="size-8 border rounded-full shadow overflow-hidden flex justify-center items-center">
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.email}
            className="w-full block"
          />
        </div>
      )}

      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
};

export default AuthButton;
