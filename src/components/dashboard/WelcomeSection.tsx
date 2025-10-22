import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export  async function WelcomeSection() {
    const user = await currentUser();
  return (
                <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" >
                    </div>
                    <span className="text-sm font-medium text-primary">
                        Online Consultation Ready
                    </span>
                    
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Good {" "}
                            {new Date().getHours() < 12
                              ? "Morning"
                              : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {user?.firstName}!
                        </h1>
                        <p className="text-muted-foreground">
                            Welcome back to AIVADENT. Your AI-powered dental assistant is here to help you with all your dental consultation needs.
                        </p>
                    </div>
                </div>
                <div className="lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
                <Image src="/logo.png" alt="" width={64} height={64} className="w-16 h-16" />
                </div>
                </div>      

  )
}

export default WelcomeSection