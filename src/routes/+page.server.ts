import Stripe from 'stripe';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10"
})

export const actions: Actions = {
    checkout: async ({ request }) => {
        let url: string | null;

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: "",
                        quantity: 1
                    }
                ],
                mode: "payment",
                success_url: `${request.headers.get("origin")}/success=true`,
                cancel_url: `${request.headers.get("origin")}/canceled=true`
            });

            url = session.url;
        } catch {
            throw error(500, "Failed to create checkout session")
        }

        if (url) {
            console.log(url);

            throw redirect(303, url);
        }
    }
}