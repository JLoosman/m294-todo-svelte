<script>
    import {v4 as uuidv4} from 'uuid'
    import { flip } from 'svelte/animate'
    import { fade, fly } from 'svelte/transition'

    import { todo } from './lib/stores/todoStore.js'
    import Task from './lib/components/singleTask.svelte'
    import Card from './lib/components/reusable/Card.svelte'
    import Button from './lib/components/reusable/Button.svelte'


    // call function every time the store changes
    $: $todo, sortStore()
    $: $todo, resetSearch()

    // when called sort store by the value of done
    const sortStore = () => {
        $todo.sort((x, z) => {
            return  Number(x.done) - Number(z.done)
        })
    }

    let newTask = "";
    let showSearch = false;
    let searchValue = "";
    let filteredTodo;

    // close Search modal and reset Search
    const resetSearch = () => {
        filteredTodo = $todo;
        searchValue = "";
        showSearch = false;
    }

    const handleAddTask = () => {

        // cancel if input = empty
        if(newTask.trim() === "") {return}

        // calculate todays date in correct format for the html date input
        let now = new Date(), month, day, year

        month = '' + (now.getMonth() + 1)
        day = '' + now.getDate()
        let nextDay = (now.getDate() + 1)
        year = now.getFullYear()

        if (month.length < 2) 
            month = '0' + month
        if (day.length < 2) 
            day = '0' + day

        let startDate = [year, month, day].join('-')
        let endDate = [year, month, nextDay].join('-')

        todo.update((item) => [{done: false, title: newTask, description: "", important: false, urgent: false, progress: 0, author: "", category: "Category", startDate, endDate, id:uuidv4()}, ...item])

        // reset input value
        newTask = "";
    }

    // open modal to start searching
    const handleShowSearch = () => {
        showSearch = !showSearch;
        if(!showSearch) {
            filteredTodo = $todo;
            searchValue = "";
        }
    }

    // when searching a copy of todo array gets made with the search as filter value
    const handleSearch = () => {
        if(searchValue !== "") {
            filteredTodo = $todo.filter((task) => {
                // console.log(task.title.includes(searchValue.toLowerCase()));
                return task.title.toLowerCase().includes(searchValue.toLowerCase())
            })
        } else {
            filteredTodo = $todo;
        }
    }
</script>

<section>
    <div class="search">
        {#if showSearch}
            <div transition:fly={{x: 60}}>
                <Card>
                    <input class="bigInput" type="text" placeholder="Search..." bind:value={searchValue} on:input={handleSearch}>
                </Card>
            </div>
        {/if}
        <Button round={true} on:click={handleShowSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" fill="#2D2D2D"></path>
            </svg>
        </Button>
    </div>
    <h1 class="title">TO-DO</h1>

    <div class="container">
      <form on:submit|preventDefault={handleAddTask}>
          <Card>
              <input class="bigInput" bind:value={newTask} type="text" placeholder="Add something new here..." required maxlength="50">
          </Card>
          <Button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="5" fill="#646FF0"/>
                  <path d="M10 4V10H4V14H10V20H14V14H20V10H14V4H10Z" fill="white"/>
              </svg>
          </Button>
      </form>
    </div>
  
    {#each filteredTodo as task (task.id)}
    <div animate:flip={{duration: 500}}>
        <Task singleTask={task}/>
    </div>
    {:else}
        <div in:fade>
            <Card>Nothing here...</Card>
            <img src="./dino.png" alt="A cute dinosaur">
        </div>
    {/each}
</section>

<style>
    section {
        margin: 0 auto;
        min-width: 260px;
        width: 40%;
        text-align: center;
    }

    .search {
        position: absolute;
        display: flex;
        align-items: center;
        right: 10px;
        top: 10px;
    }

    @media screen and (max-width: 1300px) {
        section {
            width: 70%;
        }
    }

    .title {
        color: var(--primary-color);
        font-size: 70px;
        margin: 40px 0;
        min-width: 230px;
        user-select: none;
        text-shadow: 5px 5px 0 var(--accent-color);
    }

    .container form {
        display: flex;
        align-items: center;
    }

    .bigInput {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 20px;
    }

    .bigInput:focus {
        outline: none;
    }

    img {
        width: 200px;
        height: 200px;
        filter: hue-rotate(125deg);
    }
</style>