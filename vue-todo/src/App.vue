<template>
  <div class="home">
    <h1>Todo application</h1>
    <hr>
    <TodoList
      v-bind:todos="todos"
      @remove-todo="removeTodo"
    />
  </div>
</template>

<script lang="ts">

import { ref } from 'vue';
import TodoList from './components/TodoList.vue';

interface todo {
  id: number;
  title: string;
  completed: boolean;
}

// interface setup {}

export default {
  components: {
    TodoList,
  },
  setup(): any {
    let todos = ref([
      { id: 1, title: 'task1', completed: false },
      { id: 2, title: 'task2', completed: false },
      { id: 3, title: 'task3', completed: false },
      { id: 4, title: 'task4', completed: false },
      { id: 5, title: 'task5', completed: false },
      { id: 6, title: 'task6', completed: false },
    ]);

    const removeTodo = (id: number) => {
      todos = ref(todos.value.filter((t: todo) => t.id !== id));
    };

    return {
      todos,
      removeTodo,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
