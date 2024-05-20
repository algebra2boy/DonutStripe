<script lang="ts">
    import { checkoutItem } from "./store.js";
    import type { Donut } from "./Donut.d.ts";

    export let donut: Donut;

    function addToCart() {
        checkoutItem.update((items) => {
            const item = items.find((i) => i.price === donut.id);
            if (item) {
                item.quantity += 1;
            } else {
                items.push({ price: donut.id, quantity: 1 });
            }
            return items;
        });
    }

    let count: number | undefined = undefined;

    checkoutItem.subscribe((items) => {
        const item = items.find((i) => i.price === donut.id);
        if (item) {
            count = item.quantity;
        }
    });
</script>

<div class="card w-60 h-96 bg-base-100 shadow-xl">
    <figure class="relative">
        <img
            src={donut.imageURL}
            alt={donut.title}
            class="object-cover w-60 h-60"
        />

        {#if count}
            <div
                class="absolute top-2 right-2 bg-green-400 text-white rounded w-6 h-6 flex justify-center"
            >
                {count}
            </div>
        {/if}
    </figure>
    <div class="card-body">
        <h2 class="card-title">
            {donut.title}
            {#if donut.isNew}
                <div class="badge badge-secondary">NEW</div>
            {/if}
        </h2>
        <p>{donut.description}{" $" + donut.price}</p>
        <div class="card-actions justify-end">
            {#each donut.tags as tag}
                <div class="badge badge-outline">{tag}</div>
            {/each}
        </div>
        <button class="btn btn-sm btn-primary mt-1" on:click={addToCart}
            >Add To Cart</button
        >
    </div>
</div>
