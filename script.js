const VTC_NANOSECONDS = 1850n * 1_000_000_000n; // 30 minutes and 50 seconds
const VTC_DECIMAL_PLACES = 6;
const VTC_PRECISION = 10n ** BigInt(VTC_DECIMAL_PLACES + 1);
const VTC_EPOCH = Temporal.Instant.from("2000-01-01T00:00:00Z");

setInterval(update, 50);

function update() {
    const now = Temporal.Now.instant();

    const elapsedNanoseconds =
        now.epochNanoseconds - VTC_EPOCH.epochNanoseconds;

    const vtc = elapsedNanoseconds / VTC_NANOSECONDS;

    const fracUnrounded =
        (elapsedNanoseconds * VTC_PRECISION) / VTC_NANOSECONDS
        % VTC_PRECISION; // RAHHHH WE HATE FLOATINGPOINT

    const fracRounded =
        fracUnrounded % 10n >= 5n
            ? fracUnrounded / 10n + 1n
            : fracUnrounded / 10n;
    
    const hue =
        360 * Number(fracRounded)
        / 10 ** VTC_DECIMAL_PLACES // ok floating point you win, happy now

    document.getElementById("big").textContent = vtc;

    document.getElementById("small").textContent =
        "." + fracRounded.toString().padStart(VTC_DECIMAL_PLACES, "0");
    
    const color = `hsl(${hue}, 100%, 50%)`;

    document.getElementById('big').style.color = color;
    document.getElementById('small').style.color = color;
}