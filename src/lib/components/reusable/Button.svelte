<script>
    export let flat = false;
    export let round = false;
</script>

<button class:flat class:round on:click>
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

    button.round {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        height: 50px;
        width: 50px;
        border-radius: 25px;
    }

    button:hover {
        box-shadow: 0 4px 5px #646FF066;
    }

    button.flat:hover {
        box-shadow: none;
    }
</style>