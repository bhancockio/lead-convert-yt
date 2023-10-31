import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/utils/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const userSubscription = await prismadb.subscription.findUnique({
      where: { userId: user.id },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
      });

      return NextResponse.json({ url: stripeSession.url }, { status: 200 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Lead Convert Pro",
              description: "Unlimited AI Lead Magnets",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url }, { status: 200 });
  } catch (e) {
    console.error("[STRIPE ERROR]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
