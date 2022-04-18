<template>
  <div class="todo-list">
    <ul>
      <TodoItem
        v-for="todo of todos"
        v-bind:todo="todo"
        v-bind:key=todo.id
        v-on:remove-todo="removeTodo"
      />
    </ul>
  </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import TodoItem from './TodoItem.vue';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

export default {
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Object as () => Todo[],
    },
  },
  setup(props: any) {
    const removeTodo = (id: number): void => {
      // $emit('remove-todo', id);
    };

    return {
      removeTodo,
    };
  },
};
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
