
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatToAsk from "@/components/landing/WhatToAsk";
import PricingSection from "@/components/landing/PricingSection";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/lib/actions/users";
import RedirectIfSignedIn from "@/components/RedirectIfSignedIn";

export default async  function Home() {
   
  
  return (
    <div className="min-h-screen bg-background">
      <RedirectIfSignedIn/>
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>


  )
}
