import Navbar from "@/components/Navbar";
import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CrownIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function ProPage() {
    const user = await currentUser();
    if (!user) {
      redirect('/');
    }
  return (
    <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
          <div className="mb-12 overflow-hidden">
            <div className="flex items-center justify-between bg-gradient-to-br from-primary/10 to-background rounded-3xl p-8 border border-primary/20">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse">
                    </div>
                    <span className="text-sm font-medium text-primary">
                        Upgrade to Pro
                    </span>
                    
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                           Unlock Premium AI Features
                        </h1>
                        <p className="text-muted-foreground">
                            Get access to advanced AI tools and priority support by upgrading to our Pro plan.
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <CrownIcon className="w-16 h-16 text-primary" />
                </div>
                </div>
                </div>
                </div>
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">
                      Choose Your Plan!!
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Select the perfect plan to elevate your AI experience with our Pro features.
                    </p>
                  </div>
                  <PricingTable />
                </div>
            </div>
    </>
    
  );
}
export default ProPage;