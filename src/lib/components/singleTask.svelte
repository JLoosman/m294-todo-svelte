<script>    
    import { todo } from '../stores/todoStore';
    import Card from './reusable/Card.svelte';
    import Button from './reusable/Button.svelte';
    import Checkbox from './reusable/Checkbox.svelte';
    import ModalCard from './ModalCard.svelte';

    export let singleTask = {}

    let done = singleTask.done;
    let showModal = false;
    let priority = "Weg damit"
    let priorityColor = "#212121"

    $: singleTask.important, singleTask.urgent, calculatePriority()
    
    // toggle Modal
    const handleShowModal = () => {
        showModal = !showModal;
    }

    // handle Toggle of checkbox to finish a task and return it
    const handleToggle = () => {
        singleTask.done = !done
        done = !done
        showModal = false
        todo.update((item) => [...item])
    }

    // redeclare store when input is made
    const handleInput = () => {
        todo.update((item) => [...item])
    }

    const handleDelete = () => {
        // filtering out a object from the array
        todo.update((item) => item.filter((e) => e.id != singleTask.id))
    }

    const calculatePriority = () => {
        if(singleTask.important && singleTask.urgent) {
            priority = "Sofort erledigen"
            priorityColor = "#FF4C4C"
        } else if (!singleTask.important && !singleTask.urgent){
            priority = "Weg damit"
            priorityColor = "#646FF0"
        } else {
            priority = singleTask.important ? "Einplanen und Wohlfühlen" : "Gib es ab"
            priorityColor = "#FAD448"
        }
    }

</script>

<div  class:done class="container">
    <Card>
        <Checkbox done={done} on:change={handleToggle}/>
        <input class:done disabled={!showModal} type="text" bind:value={singleTask.title} on:input={handleInput} maxlength="50">
        <div title={priority} class="priority">
            <svg enable-background="new 0 0 91.8 92.6" id="Layer_1" version="1.0" viewBox="0 0 91.8 92.6" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M45.9,3.6c-23.5,0-42.5,19-42.5,42.5c0,23.5,19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5  C88.4,22.7,69.4,3.6,45.9,3.6z M43.7,21.1h4.3c0.5,0,0.9,0.4,0.9,0.9l-0.6,34.5c0,0.5-0.4,0.9-0.9,0.9h-3c-0.5,0-0.9-0.4-0.9-0.9  L42.8,22C42.8,21.5,43.2,21.1,43.7,21.1z M48.6,71.2c-0.8,0.8-1.7,1.1-2.7,1.1c-1,0-1.9-0.3-2.6-1c-0.8-0.7-1.3-1.8-1.3-2.9  c0-1,0.4-1.9,1.1-2.7c0.7-0.8,1.8-1.2,2.9-1.2c1.2,0,2.2,0.5,3,1.4c0.5,0.6,0.8,1.3,0.9,2.1C49.9,69.3,49.5,70.3,48.6,71.2z" fill="{priorityColor}"/>
            </svg>               
        </div>
        <Button flat={true} on:click={handleShowModal}>
            <svg class:rotated={showModal} width="24" height="16" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.625 0L0 5.45455L15 20L30 5.45455L24.375 0L15 9.09091L5.625 0Z" fill="#FAD448"/>
            </svg>
        </Button>
    </Card>
    
    <Button on:click={handleDelete}>
        <svg class="buttonIcon" width="21.6" height="24" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 0C9.1875 0 7.5 1.6875 7.5 3.75H3.75C1.6875 3.75 0 5.4375 0 7.5H26.25C26.25 5.4375 24.5625 3.75 22.5 3.75H18.75C18.75 1.6875 17.0625 0 15 0H11.25ZM3.75 11.25V29.2875C3.75 29.7 4.05 30 4.4625 30H21.825C22.2375 30 22.5375 29.7 22.5375 29.2875V11.25H18.7875V24.375C18.7875 25.425 17.9625 26.25 16.9125 26.25C15.8625 26.25 15.0375 25.425 15.0375 24.375V11.25H11.2875V24.375C11.2875 25.425 10.4625 26.25 9.4125 26.25C8.3625 26.25 7.5375 25.425 7.5375 24.375V11.25H3.7875H3.75Z" fill="#FAD448"/>
        </svg>            
    </Button>
</div>
{#if showModal}
    <ModalCard singleTask={singleTask}/>
{/if}

<style>
    .container {
        display: flex;
        align-items: center;
    }

    .container.done {
        filter: opacity(50%);
    }

    input {
        display: inline-block;
        padding: 5px;
        margin: 0 5px;
        width: 100%;
        border: none;
        text-align: left;
        font-size: 18px;
    }

    input.done {
        text-decoration: line-through;
    }

    .priority {
        margin: 10px 10px;
        padding: 0 10px;
        height: 40px;
    }

    .priority > svg {
        height: 25px;
        margin: 7px 0;
    }

    .buttonIcon>path {
        fill: var(--accent-color);
    }

    svg.rotated {
        transform: rotate(180deg);
    }

</style>