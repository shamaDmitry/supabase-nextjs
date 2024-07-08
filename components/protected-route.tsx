import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";

interface ProtectedRouteProps extends PropsWithChildren {}

const ProtectedRoute: FC<ProtectedRouteProps> = async ({ children }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
