<script lang="ts">
    import { VTC } from '#lib/timescale.ts';

    let decimalPlaces = $state(6);

    let wholePart = $state(0);
    let fracPart = $state('0');

    let baseHue = $state(0);
    let modifiedHue = $state(0);

    let interval: ReturnType<typeof setInterval>;
    let useLogoStyle = $state(true);

    function update() {
        let vtc = VTC.now(decimalPlaces);

        wholePart = vtc.floor().toNumber();
        fracPart = Number(vtc.mod(1).toFixed(decimalPlaces).slice(2))
            .toString()
            .padStart(decimalPlaces, '0');

        baseHue = (360 * Number(fracPart)) / 10 ** decimalPlaces; // ok floating point you win, happy now

        modifiedHue = baseHue - 160;
    }

    update();
    let updateInterval = $state(50);

    $effect(() => {
        interval = setInterval(update, updateInterval);

        return () => clearInterval(interval);
    });

    function decreasePrecision() {
        if (decimalPlaces > 2) {
            decimalPlaces--;
        }
    }

    function increasePrecision() {
        if (decimalPlaces < 10) {
            decimalPlaces++;
        }
    }

    function decreaseUpdateInterval() {
        if (updateInterval > 10) {
            updateInterval -= 10;
        }
    }

    function increaseUpdateInterval() {
        if (updateInterval < 100) {
            updateInterval += 10;
        }
    }
</script>

<svelte:window
    onkeydown={(event) => {
        if (event.key === 'ArrowLeft') {
            decreasePrecision();
        }

        if (event.key === 'ArrowRight') {
            increasePrecision();
        }

        if (event.key === 'ArrowUp') {
            decreaseUpdateInterval();
        }

        if (event.key === 'ArrowDown') {
            increaseUpdateInterval();
        }
    }}
/>
<section id="vtc-display">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        id="vtc"
        onclick={() => {
            useLogoStyle = !useLogoStyle;
        }}
    >
        VTC:
        {#if useLogoStyle}
            <span
                class="whole"
                style:color={`hsl(${baseHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${baseHue}, 100%, 50%, 0.5)`}
            >
                {wholePart}
            </span>/<span
                class="frac"
                style:color={`hsl(${modifiedHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${modifiedHue}, 100%, 50%, 0.5)`}
            >
                {fracPart}
            </span>
        {:else}
            <span
                class="whole"
                style:color={`hsl(${baseHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${baseHue}, 100%, 50%, 0.5)`}
            >
                {wholePart}
            </span>.<span
                class="frac"
                style:color={`hsl(${baseHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${baseHue}, 100%, 50%, 0.5)`}
            >
                {fracPart}
            </span>
        {/if}
    </div>

    <p class="description">
        Click to switch between styles.<br />

        Use <button onclick={decreasePrecision}>left</button>/<button onclick={increasePrecision}
            >right</button
        >

        arrow keys to change precision. ({decimalPlaces}
        decimal places)<br />

        Use <button onclick={decreaseUpdateInterval}>up</button>/<button
            onclick={increaseUpdateInterval}>down</button
        >
        arrow keys to change update rate. ({updateInterval}ms)<br />
        <a href="/vtc">What is this?</a>
    </p>
</section>

<style>
    #vtc-display {
        position: relative;
        overflow: hidden;
        text-align: center;

        color: white;
        gap: 0;
    }

    #vtc {
        cursor: pointer;
        user-select: none;
        transition: letter-spacing 2s ease;
    }

    #vtc:hover {
        transition: letter-spacing 0.5s ease;
        letter-spacing: 0.1em;
    }

    #vtc .whole {
        font-size: 2em;
    }
    #vtc .frac {
        font-size: 0.9em;
    }

    #vtc-display .description {
        color: #777;
        font-size: 0.7em;
    }

    #vtc-display button {
        color: #aaa;
        transition: transform 200ms ease;
    }

    #vtc-display button:hover {
        transform: translateY(-2px) scale(1.05);
    }
</style>
