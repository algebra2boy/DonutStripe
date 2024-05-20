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

            const data = await request.formData();
            
            const line_items = [];

            // data.entries returns an iterator of key, value pairs
            // deconstruct key as price, and value as quantity 
            for (const [price, quantity] of data.entries()) {
                line_items.push({ price, quantity: Number(quantity) });
            }
    
            const session = await stripe.checkout.sessions.create({
                line_items,
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