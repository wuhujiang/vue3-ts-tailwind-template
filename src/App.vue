<template>
  <div class="app">
    <header>
      <h1> 欢迎来到超马的世界 </h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App component logic here
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 36px;
}

main {
  min-height: 60vh;
}
</style>
