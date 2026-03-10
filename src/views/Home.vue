<template>
  <div class="home">
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <div class="counter">
      <h2>Counter: {{ counter.count }}</h2>
      <h3>Double Count: {{ counter.doubleCount }}</h3>
      <button @click="counter.increment">
        Increment
      </button>
      <button @click="counter.decrement">
        Decrement
      </button>
    </div>
    <!-- 使用自动注册的组件 -->
    <TestComponent />
    <router-link to="/about">
      Go to About
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../stores/counter';

const counter = useCounterStore();
</script>

<style scoped lang="scss">
.home {
  padding: 20px;
  h1 {
    color: $jw-primary-color;
  }
}

.counter {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
