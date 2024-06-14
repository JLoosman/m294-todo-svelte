<script>
    export let done = false
</script>

<input checked={done} class="checkbox" type="checkbox" on:change>

<style>
    .checkbox {
        margin-right: 15px;
        transform: scale(1.5);
    }
</style>