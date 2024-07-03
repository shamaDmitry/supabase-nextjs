"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();

  const [orders, setOrders] = useState<any[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await supabase.from("orders").select("*, customers(*)");

      setOrders(res.data);

      console.log("res", res);
    };

    getData();
  }, []);

  return (
    <pre>
      <Button
        variant={"destructive"}
        className="mb-4"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </Button>

      <div>orders {JSON.stringify(orders, null, 2)}</div>
    </pre>
  );
}
