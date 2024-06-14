<script>
    import {v4 as uuidv4} from 'uuid'
    import { todo } from './lib/stores/todoStore.js'
    import Task from './lib/components/singleTask.svelte'
    import Card from './lib/components/reusable/Card.svelte'
    import Button from './lib/components/reusable/Button.svelte'


    // call function every time the store changes
    $: $todo, sortStore()

    // when called sort store by the value of done
    const sortStore = () => {
        $todo.sort((x, z) => {
            return  Number(x.done) - Number(z.done)
        })
    }

    let newTask = "";

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
        newTask = ""
    }

</script>

<section>
    <h1 class="title">TO-DO</h1>

    <div class="container">
      <form on:submit|preventDefault={handleAddTask}>
          <Card>
              <input class="addTask" bind:value={newTask} type="text" placeholder="Add something new here..." required>
          </Card>
          <Button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="5" fill="#646FF0"/>
                  <path d="M10 4V10H4V14H10V20H14V14H20V10H14V4H10Z" fill="white"/>
              </svg>
          </Button>
      </form>
    </div>
  
    {#each $todo as task (task.id)}
        <Task singleTask={task}/>
    {:else}
        <Card>Nothing here...</Card>
        <img src="./dino.png" alt="A cute dinosaur">
    {/each}
</section>

<style>
    section {
        margin: 0 auto;
        min-width: 260px;
        width: 40%;
        text-align: center;
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

    .addTask {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 20px;
    }

    .addTask:focus {
        outline: none;
    }

    img {
        width: 200px;
        height: 200px;
        filter: hue-rotate(125deg);
    }
</style>