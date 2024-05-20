<script lang="ts">
    import type { Donut } from "./Donut.d.ts";

    export let donut: Donut;
</script>

<div class="card w-60 h-96 bg-base-100 shadow-xl">
    <figure>
        <img src={donut.imageURL} alt={donut.title} class="object-cover w-60 h-60" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">
            {donut.title}
            {#if donut.isNew}
                <div class="badge badge-secondary">NEW</div>
            {/if}
        </h2>
        <p>{donut.description}</p>
        <div class="card-actions justify-end">
            {#each donut.tags as tag}
                <div class="badge badge-outline">{tag}</div>
            {/each}
        </div>
    </div>
</div>
