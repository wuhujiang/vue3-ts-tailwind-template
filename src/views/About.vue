<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about page.</p>
    <router-link to="/">
      Go to Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
// About page logic here
</script>

<style scoped lang="scss">
.about {
  padding: 20px;
  h1 {
    color: $jw-primary-color;
  }
}
</style>
