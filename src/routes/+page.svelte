<script lang="ts">
    import { page } from "$app/stores";
    import DonutCard from "$lib/DonutCard.svelte";
    import { data } from "./donutData";
    import { checkoutItem } from "$lib/store";

    let isCancelled = $page.url.searchParams.has("cancelled");
    let isSuccess = $page.url.searchParams.has("success");
</script>

<main class="flex flex-col justify-center items-center h-screen p-4">
    <div class="flex mb-4">
        <h1 class="text-4xl font-bold">Donut Store</h1>
    </div>

    <div class="flex flex-col justify-center items-center p-8">
        <div class="flex shopping-container gap-10">
            {#each data as donut}
                <DonutCard {donut} />
            {/each}
        </div>

        <div class="flex-1 checkout-container">
            <form
                action="?/checkout"
                method="POST"
                class="flex flex-col items-center"
            >
                {#each $checkoutItem as item}
                    <input
                        name={item.price}
                        class="hidden"
                        value={item.quantity}
                    />
                {/each}

                <button
                    class="mt-10 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    type="submit"
                    disabled={$checkoutItem.length === 0}
                    class:disabled={$checkoutItem.length === 0}
                    >Checkout</button
                >
            </form>

            {#if isCancelled || isSuccess}
                <div class="mt-4 text-center">
                    {#if isSuccess}
                        <h1 class="text-green-500 text-lg">
                            Thank you for buying our donut! Enjoy!
                        </h1>
                    {:else}
                        <h1 class="text-red-500 text-lg">
                            Your transaction has been cancelled, try again.
                        </h1>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</main>

<style lang="postcss">
    .disabled {
        @apply bg-gray-400;
    }
</style>