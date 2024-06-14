<script>
    export let flat = false;
</script>

<button class:flat on:click>
    <slot />
</button>

<style>
    button {
        margin: 10px 10px;
        padding: 0 10px;
        height: 40px;
        color: var(--dark-gray);
        background-color: var(--white);
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 5px #646FF033;
    }

    button.flat {
        box-shadow: none;
        margin: 10px 0;
    }
</style>