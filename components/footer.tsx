import { cn } from "@/lib/utils";
import { FC } from "react";

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn({
        "w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs":
          true,
        [`${className}`]: className,
      })}
    >
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </p>
    </footer>
  );
};

export default Footer;
