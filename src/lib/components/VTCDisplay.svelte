<script lang="ts">
    import { VTC } from '#lib/timescale.ts';
    import Decimal from 'decimal.js';

    function emu() {
        console.log('smile');
    }
    // :3c
    // :3c!!

    let decimalPlaces = $state(6);

    let wholePart = $state(0);
    let fracPart = $state('0');

    let baseHue = $state(0);
    let vividHue = $state(0);
    let stasisHue = $state(0);

    let interval: ReturnType<typeof setInterval>;
    let useLogoStyle = $state(true);

    // let it goo
    let frozen = $state(false);

    const ε = new Decimal('0.0001'); // ts is truly a wacle moment from lan lan man
    const freezeDurationMs = 5000;

    function update() {
        let vtc = VTC.now(decimalPlaces);
        let diff = vtc.minus(vtc.floor());

        if (diff.lt(ε) && !frozen) {
            freeze(freezeDurationMs);
        }

        if (frozen) {
            vtc = vtc.round();
        }

        wholePart = vtc.floor().toNumber();
        fracPart = Number(vtc.mod(1).toFixed(decimalPlaces).slice(2))
            .toString()
            .padStart(decimalPlaces, '0');

        baseHue = (360 * Number(fracPart)) / 10 ** decimalPlaces; // ok floating point you win, happy now

        vividHue = baseHue - 26;

        stasisHue = baseHue - 180; // visual/studio RAHHHHHHH
    }

    update();

    let updateIntervalMs = $state(50);

    $effect(() => {
        if (frozen) return;

        interval = setInterval(update, updateIntervalMs);

        return () => clearInterval(interval);
    });

    const precision = {
        decrease: () => {
            if (decimalPlaces > 2) {
                decimalPlaces--;
            }
        },

        increase: () => {
            if (decimalPlaces < 10) {
                decimalPlaces++;
            }
        },
    };

    const updateInterval = {
        decrease: () => {
            if (updateIntervalMs > 10) {
                updateIntervalMs -= 10;
            }
        },

        increase: () => {
            if (updateIntervalMs < 100) {
                updateIntervalMs += 10;
            }
        },
    };

    function freeze(durationMs: number) {
        frozen = true;

        setTimeout(() => {
            frozen = false;
        }, durationMs);
    }
</script>

<svelte:window
    onkeydown={(event) => {
        if (event.code === 'ArrowLeft') precision.decrease();
        if (event.code === 'ArrowRight') precision.increase();

        if (event.code === 'ArrowUp') updateInterval.decrease();
        if (event.code === 'ArrowDown') updateInterval.increase();

        // P is for peam
        // keep this for now it's for testing purposes
        if (event.code === 'KeyP') {
            freeze(freezeDurationMs);
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
        VTC

        <span class="vtc-numeral" class:frozen>
            <span
                class="whole"
                style:color={`hsl(${useLogoStyle ? vividHue : baseHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${useLogoStyle ? vividHue : baseHue}, 100%, 50%, 0.5)`}
            >
                {wholePart}
            </span>/<span
                class="frac"
                style:color={`hsl(${useLogoStyle ? stasisHue : baseHue}, 100%, 50%)`}
                style:text-shadow={`0 0 20px hsla(${useLogoStyle ? stasisHue : baseHue}, 100%, 50%, 0.5)`}
            >
                {fracPart}
            </span>
        </span>
    </div>

    <p class="description">
        Click to switch between styles.<br />

        Use <button onclick={precision.decrease}>left</button>/<button onclick={precision.increase}
            >right</button
        >

        arrow keys to change precision. ({decimalPlaces} DP)<br />

        Use <button onclick={updateInterval.decrease}>up</button>/<button
            onclick={updateInterval.increase}>down</button
        >
        arrow keys to change update rate. ({updateIntervalMs}ms)<br />
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

    #vtc .vtc-numeral.frozen {
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0% {
            opacity: 100%;
        }

        50% {
            opacity: 0%;
        }

        100% {
            opacity: 100%;
        }
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
