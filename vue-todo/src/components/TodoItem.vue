<template>
  <li class="todo-item">
    <span v-bind:class="{'done': todo.completed}">
      <input type="checkbox" v-on:change="todo.completed">
      <!-- <input type="checkbox" v-on:change="todo.completed=!todo.completed"> -->
      <strong>{{ todo.id }}</strong>
      {{ todo.title }}
    </span>
    <button
      class="todo-item__remove-button"
      v-on:click="$emit('remove-todo', todo.id)"
    >
      &times;
    </button>
  </li>
</template>

<script lang="ts">

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export default {
  props: {
    todo: {
      type: Object as () => Todo,
    },
  },

  setup(props: any) {
    const log = () => {
      console.log('-- -- -- props', props);
    };
    return {
      log,
    };
  },
};
</script>

<style scoped>
  li {
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
  }
  input {
    margin-right: 1rem;
  }
  .todo-item__remove-button {
    background: red;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
  }
  .done {
     text-decoration: line-through;
  }
</style>
