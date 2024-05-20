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
                        price: "price_1PHeDsGP3FtVPI2MtxTkn86d",
                        quantity: 1
                    }
                ],
                mode: "payment",
                success_url: `${request.headers.get("origin")}?success=true`,
                cancel_url: `${request.headers.get("origin")}?cancelled=true`
            });

            url = session.url;
        } catch (e) {
            console.log(e);
            throw error(500, "Failed to create checkout session")
        }

        if (url) {
            console.log(url);

            throw redirect(303, url);
        }
    }
}