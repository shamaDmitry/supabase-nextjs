"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const res = await supabase.from("orders").select(
        `
          id,
          user_id,
          product,
          amount,
          users (
            id,
            email,
            lastname,
            firstname
          )
        `
      );
      setNotes(res.data);

      console.log("res", res);
    };

    getData();
  }, []);

  return (
    <pre>
      <Link href={"/"}>home</Link>

      <div>{JSON.stringify(notes, null, 2)}</div>
    </pre>
  );
}
