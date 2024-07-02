import React, { FC, PropsWithChildren } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface MainLayoutProps extends PropsWithChildren {}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />

      <main className="min-h-screen flex flex-col items-center my-12">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
