<script lang="ts">
    import { page } from "$app/stores";
    import DonutCard from "$lib/DonutCard.svelte";
    import { data } from "./donutData";

    let cancelled = $page.url.searchParams.has("cancelled");
    let success = $page.url.searchParams.has("success");
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
                method="post"
                class="flex flex-col items-center"
            >
                <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >Checkout</button
                >
            </form>

            {#if cancelled || success}
                <div class="mt-4 text-center">
                    {#if success}
                        <h1 class="text-green-500">Success</h1>
                    {:else}
                        <h1 class="text-red-500">Why did you cancel?</h1>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</main>
