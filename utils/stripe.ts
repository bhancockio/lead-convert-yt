import { Subscription } from "@prisma/client";
import dayjs from "dayjs";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const getPayingStatus = (subscription: Subscription | null): boolean => {
  return (
    !!subscription &&
    !!subscription.stripeCurrentPeriodEnd &&
    dayjs(subscription.stripeCurrentPeriodEnd).isAfter(dayjs())
  );
};
