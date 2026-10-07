<script lang="ts">
    import { VTC } from '#lib/timescale.ts';

    let useVTC = $state(true);

    const lastUpdated = Date.parse('2026-10-07T00:00:00.000Z');

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(lastUpdated);
</script>

<section>
    <footer>
        <p>
            Made by
            <a href="https://kekevids134.github.io">kekeee</a> and
            <a href="https://www.lanzoor.dev">lanzoor</a> and notably
            <strong><em><u>not a cl*nker</u></em></strong>.<br />
            Last updated at
            <button
                onclick={() => {
                    useVTC = !useVTC;
                }}
            >
                <code>
                    {#if useVTC}
                        VTC {VTC.from(lastUpdated)}
                    {:else}
                        {formattedDate} UTC
                    {/if}
                </code>
            </button>
        </p>
    </footer>
</section>

<style>
    footer {
        text-align: center;
    }
</style>
