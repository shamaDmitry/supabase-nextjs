import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { RecentOrderTable } from "@/components/recent-order-table";
import MainLayout from "@/components/layouts/main-layout";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <MainLayout>
      <div className="container">
        <div className="py-6 font-bold bg-purple-950 text-center mb-12">
          This is a protected page that you can only see as an authenticated
          user
        </div>

        <RecentOrderTable />
      </div>
    </MainLayout>
  );
}
