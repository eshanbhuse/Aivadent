"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; 
import { CheckCircleIcon } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number; 
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    description: "Essential dental appointment booking",
    features: [
      "Unlimited appointment booking",
      "Find dentists in your area",
      "Basic text chat support",
      "Appointment reminders",
    ],
  },
  {
    id: "ai_basic",
    name: "AI Basic",
    price: 2,
    description: "AI consultations + appointment booking",
    features: [
      "Everything in Free",
      "5 AI voice calls per month",
      "AI dental guidance & advice",
      "Symptom assessment",
      "Priority support",
      "Call history & recordings",
    ],
  },
  {
    id: "ai_pro",
    name: "AI Pro",
    price: 5,
    description: "Unlimited AI consultations and support",
    features: [
      "Everything in AI Basic",
      "Unlimited AI voice calls",
      "Personalized care plans",
      "24/7 priority AI support",
    ],
  },
];

function loadRazorpayScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PricingTable() {
  const { user, isLoaded } = useUser();
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch("/api/user-subscription")
      .then((res) => res.json())
      .then((data) => {
        setCurrentPlan(data.plan);
      })
      .catch(console.error);
  }, [isLoaded, user]);

  const handlePayment = async (plan: Plan) => {
    if (plan.id === currentPlan) {
      alert("You are already subscribed to this plan!");
      return;
    }

    const scriptLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    const res = await fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: plan.price * 100 }), 
    });

    const data = await res.json();
    if (!data.order) {
      alert("Failed to create payment order.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "AivaDent",
      description: plan.name + " Plan",
      order_id: data.order.id,
      handler: async function (response: any) {
        try {
          const verify = await fetch("/api/payment-success", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clerkId: user?.id,
              paymentId: response.razorpay_payment_id,
              plan: plan.id,
            }),
          });
          const verifyData = await verify.json();

          if (verifyData.error) {
            alert("Payment verification failed: " + verifyData.error);
          } else {
            setCurrentPlan(plan.id); 
          }
        } catch (err) {
          console.error(err);
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: user?.firstName + " " + user?.lastName,
        email: user?.emailAddresses[0].emailAddress,
      },
      theme: { color: "#e78a53" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div key={plan.id} className="relative group">
          <div
            className={`relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 transition-all duration-500 ${
              plan.id === currentPlan
                ? "bg-orange-100 cursor-not-allowed border-orange-500"
                : "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
            }`}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground mb-1">/month</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <Button
                onClick={() => handlePayment(plan)}
                disabled={plan.id === currentPlan}
                className={`w-full py-3 rounded-xl font-semibold ${
                  plan.id === currentPlan
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/95 hover:to-primary/85 shadow-lg hover:shadow-xl transition-all duration-300"
                }`}
              >
                {plan.id === currentPlan ? "Subscribed" : `Start ${plan.name}`}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
