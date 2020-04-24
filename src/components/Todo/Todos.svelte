<script>
  import TodoItem from "./TodoItem.svelte";
  import { db } from "../../firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  // User ID passed from parent
  export let uid;

  // Form Text
  let text = "";

  // Query requires an index, see screenshot below
  const query = db
    .collection("todos")
    .where("uid", "==", uid)
    .orderBy("created");

  const todos = collectionData(query, "id").pipe(startWith([]));

  function add() {
    if (text != "") {
      db.collection("todos").add({
        uid,
        text,
        complete: false,
        created: Date.now()
      });
      text = "";
    }
  }

  function updateStatus(event) {
    const { id, newStatus } = event.detail;
    db.collection("todos")
      .doc(id)
      .update({ complete: newStatus });
  }

  function removeItem(event) {
    const { id } = event.detail;
    db.collection("todos")
      .doc(id)
      .delete();
  }
</script>

<style>
  input {
    display: block;
    @apply border mt-4;
  }

  button {
    @apply bg-blue-500 text-white mr-4 no-underline font-bold px-4 py-2 rounded mt-4;
  }
  button:hover {
    @apply bg-blue-700;
  }
</style>

<h2 class="font-bold">Task List</h2>
<ul>
  {#each $todos as todo}
    <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
  {/each}
</ul>
<hr>
<input class="border-blue-500" bind:value={text} placeholder="Enter task description" />

<button on:click={add} disabled={text == ''}>Add Task</button>
