<script lang="ts">
    import { page } from "$app/stores";

    let cancelled = $page.url.searchParams.has("cancelled");
    let success = $page.url.searchParams.has("success");
</script>

<main>
    <form action="?/checkout" method="post">
        <button> checkout </button>
    </form>

    {#if cancelled}
        <p>Payment cancelled</p>
    {/if}

    {#if success}
        <p>Payment successful</p>
    {/if}
</main>

