<template>
  <div class="home">
    <h1>Home Page</h1>
    <p class="text-4xl">Welcome to the home page!</p>
    <div class="counter">
      <h2>Counter: {{ counter.count }}</h2>
      <h3>Double Count: {{ counter.doubleCount }}</h3>
      <button class="bg-primary text-white" @click="counter.increment">Increment</button>
      <button class="bg-primary text-white" @click="counter.decrement">Decrement</button>
    </div>

    <div class="report-section">
      <h2>Report API 示例（MSW Mock）</h2>
      <div class="report-actions">
        <button class="bg-primary text-white" @click="fetchTestGet">GET 测试请求</button>
        <button class="bg-primary text-white" @click="fetchTestPost">POST 测试请求</button>
        <button class="bg-primary text-white" @click="fetchReportList">获取报告列表POST请求</button>
      </div>
      <pre v-if="responseData" class="report-result">{{ responseData }}</pre>
    </div>

    <TestComponent />
    <router-link to="/about"> Go to About </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { reportApi } from '../api/test/report';
import { useCounterStore } from '../stores/counter';

const counter = useCounterStore();
const responseData = ref<unknown>(null);

async function fetchTestGet() {
  try {
    const res = await reportApi.testGet();
    responseData.value = res;
  } catch (err) {
    console.error('GET 请求失败:', err);
  }
}

async function fetchTestPost() {
  try {
    const res = await reportApi.testPost({ name: '新建测试', value: 456 });
    responseData.value = res;
  } catch (err) {
    console.error('POST 请求失败:', err);
  }
}

async function fetchReportList() {
  try {
    const res = await reportApi.getReportList({ page: 1, pageSize: 10 });
    responseData.value = res;
  } catch (err) {
    console.error('获取报告列表失败:', err);
  }
}
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

.report-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h2 {
    margin-bottom: 12px;
  }
}

.report-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.report-result {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
  font-size: 13px;
  white-space: pre-wrap;
  word-break: break-all;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
