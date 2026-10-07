<script>
    import FooterPanel from '#lib/components/FooterPanel.svelte';
    import Header from '#lib/components/Header.svelte';
    import VTCDisplay from '#lib/components/VTCDisplay.svelte';
</script>

<svelte:head>
    <title>home | kekeee</title>
</svelte:head>

<Header />

<section id="intro" class="radial-bg">
    <p>
        <strong>Welcome to my website!</strong><br />
        This is a collection of things that I find interesting/want to talk about/post online for the
        greater good, etc. I hope you enjoy browsing around!
    </p>

    <p>
        Oh, and VTC? VTC stands for <strong>Void Time Cycles</strong>.<br />
        Check out <a href="/vtc">/vtc</a> for more information.<br />
    </p>
</section>

<VTCDisplay />

<FooterPanel />
