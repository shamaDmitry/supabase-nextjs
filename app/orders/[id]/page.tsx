import { createClient } from "@/utils/supabase/server";
import MainLayout from "@/components/layouts/main-layout";
import Link from "next/link";

const getData = async (id: string) => {
  const supabase = createClient();
  const { data } = await supabase.from("orders").select("*").eq("id", id);

  return data;
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getData(id);

  return (
    <MainLayout>
      <div className="container">
        <Link
          href="/orders"
          className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover inline-flex items-center group text-sm border border-foreground mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <h1 className="text-4xl font-bold">Order</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </MainLayout>
  );
}
