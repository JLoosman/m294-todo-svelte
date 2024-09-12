<div class="card">
    <slot />
</div>

<style>
    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        padding: 5px 20px;
        height: 40px;
        min-width: 200px;
        width: 100%;
        color: var(--dark-gray);
        background-color: var(--white);
        border-radius: 10px;
        box-shadow: 0 4px 5px #646FF033;
    }
</style>