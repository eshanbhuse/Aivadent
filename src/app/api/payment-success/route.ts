import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clerkId, paymentId, plan } = await req.json();

  await prisma.user.update({
    where: { clerkId: clerkId },
    data: { subscriptionStatus: "ACTIVE", lastPaymentId: paymentId, plan },
  });

  return NextResponse.json({ success: true });
}
