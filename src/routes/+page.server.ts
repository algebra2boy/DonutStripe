import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2024-04-10"
})

export const actions: Actions = {
    checkout: async ({ request }) => {
        let url: string | null;

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: "price_1PIJsrGP3FtVPI2MXr7hTvXr",
                        quantity: 2,

                    },
                    {
                        price: "price_1PIJtvGP3FtVPI2MbzBRKqTc",
                        quantity: 1
                    }
                ],
                mode: "payment",
                success_url: `${request.headers.get("origin")}?success=true`,
                cancel_url: `${request.headers.get("origin")}?cancelled=true`
            });

            url = session.url;
        } catch (e) {
            throw error(500, "Failed to create checkout session")
        }

        if (url) {
            throw redirect(303, url);
        }
    }
}