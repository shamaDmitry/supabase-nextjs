import { RecentOrderTable } from "@/components/recent-order-table";
import MainLayout from "@/components/layouts/main-layout";
import ProtectedRoute from "@/components/protected-route";

export default async function ProtectedPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container">
          <div className="py-6 font-bold bg-purple-950 text-center mb-12">
            This is a protected page that you can only see as an authenticated
            user
          </div>

          <h1 className="text-3xl font-bold mb-6">Orders</h1>

          <RecentOrderTable />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
