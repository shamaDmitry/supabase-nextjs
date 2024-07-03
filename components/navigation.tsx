import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AuthButton from "@/components/auth-button";
import Logo from "./logo";
import { uuid } from "@/lib/utils";

const menu = [
  {
    id: uuid(),
    href: "/orders",
    text: "orders",
  },
  { id: uuid(), href: "/test", text: "test" },
];

export default async function Navigation() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Logo />

        {user && (
          <div className="mx-auto flex items-center gap-3">
            {menu.map((menuItem) => {
              return (
                <Link
                  key={menuItem.id}
                  href={`${menuItem.href}`}
                  className="capitalize font-bold"
                >
                  {menuItem.text}
                </Link>
              );
            })}
          </div>
        )}

        <div className="ml-auto">
          <AuthButton user={user} />
        </div>
      </div>
    </nav>
  );
}
