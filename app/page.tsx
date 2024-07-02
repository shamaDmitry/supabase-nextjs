import Hero from "@/components/hero";
import { PricingPlans } from "@/components/pricing-plans";
import MainLayout from "@/components/layouts/main-layout";

export default async function Index() {
  return (
    <MainLayout>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
          <Hero />

          <main className="flex-1 flex flex-col gap-6">
            <PricingPlans />

            {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2> */}

            {/* <SignUpUserSteps /> */}

            {/* <ConnectSupabaseSteps /> */}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
