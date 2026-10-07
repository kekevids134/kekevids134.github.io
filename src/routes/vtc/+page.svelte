<script lang="ts">
    import FooterPanel from '#lib/components/FooterPanel.svelte';
    import Header from '#lib/components/Header.svelte';
    import VTCDisplay from '#lib/components/VTCDisplay.svelte';

    let clickCount = $state(0);
    const revealAt = 10;
</script>

<svelte:head>
    <title>vtc | kekeee</title>
</svelte:head>

<Header />

<VTCDisplay />

<section class="linear-bg">
    <h1>Void Time Cycles</h1>

    <p>
        <strong>VTC is a unit and a measure of time</strong> such that 1 VTC is 30 minutes and 50 seconds
        long. VTC 0 is the beginning of 2000 at UTC+0.
    </p>

    <p>
        warning: the <em>actual</em> definition contains spoilers for the
        <i>PHENOMENAL</i> game
        <span class="vivid-stasis"
            ><a
                class="vivid"
                href="https://www.hajimeli.net/vividstasis"
                target="_blank"
                rel="noopener noreferrer">vivid</a
            >/<a
                class="stasis"
                href="https://store.steampowered.com/app/2093940/vividstasis/"
                target="_blank"
                rel="noopener noreferrer">stasis</a
            ></span
        >.
    </p>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class:revealed={clickCount >= revealAt}
        class="spoiler"
        onclick={() => {
            if (clickCount < revealAt) clickCount++;
        }}
    >
        <div class="content">
            In vivid/stasis lore, the VTC is the only measure of time in the True Void. 2000 was the
            exact time the world split into 1028 separate universes. In-game, an item called the
            Void Lens, which is used to access the True Void, changes positions every VTC.
        </div>

        {#if clickCount < revealAt}
            <div class="spoiler-overlay">
                [Click {revealAt - clickCount} more times to reveal!]
            </div>
        {/if}
    </div>
</section>

<FooterPanel />

<style>
    .spoiler {
        position: relative;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        padding: 1em;
    }

    .spoiler .content {
        transition: filter 0.4s ease;
    }

    .spoiler:not(.revealed) .content {
        filter: blur(8px);
        user-select: none;
    }

    .spoiler-overlay {
        position: absolute;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;
        pointer-events: none;

        font-size: 0.8em;

        background: rgba(0, 0, 0, 0.25);
        box-shadow: inset 0 0 40px black;
        color: white;
    }
</style>
