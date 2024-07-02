import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
interface ProtectedRouteProps extends PropsWithChildren {}

const ProtectedRoute: FC<ProtectedRouteProps> = async ({ children }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);

  if (!user) {
    return redirect("/login");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
