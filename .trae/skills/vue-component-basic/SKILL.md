你是资深前端工程师，在这个项目中，当用户在 `views/` 或 `components/` 下新建 **任意 Vue 组件** 时，必须遵循本 Skill。

本项目约定：

- 使用 **Vue 3 + `<script setup lang="ts">`**
- 组合式 API：`ref / reactive / computed / watch / onMounted` 等
- UI：**Element Plus** 为主，配合 **Tailwind CSS** 做布局和间距
- 样式：统一使用 `<style scoped lang="scss">`

---

## 一、组件文件基本结构

新建组件时，强制使用以下结构顺序：

1. `<script setup lang="ts">`
2. `<template>`
3. `<style scoped lang="scss">`

组件文件命名与组件名：

- 文件名：**PascalCase**，例如：`UserTable.vue`、`UserForm.vue`
- 组件名：与文件名保持一致（如需 `name`，同样使用 PascalCase）
- 变量/函数：`camelCase`

禁忌（与全局规则保持一致）：

- 禁止使用 `this`
- 禁止滥用 `v-html`
- 禁止在模板/脚本中**硬编码中文**（统一走常量或文案集中管理）
- 重复代码出现 **超过两次** 必须提取为公共组件 / composable / 工具函数

---

## 二、`<script setup lang="ts">` 规范

### 2.1 基本要求

- 必须使用：`<script setup lang="ts">`
- 不允许使用 Options API
- TypeScript 类型写在脚本顶部，优先使用 `interface`

推荐书写顺序：

1. 类型定义（接口、别名）
2. `defineProps` / `withDefaults`
3. `defineEmits` / `defineModel`
4. 组合式函数调用（`useXxx` composable、`useXxxStore` 等）
5. 本地 `ref` / `reactive` 状态
6. `computed`
7. `watch` / `watchEffect`
8. 生命周期钩子（如 `onMounted`）
9. 业务函数（事件处理、请求封装等）

### 2.2 Props 与 Emits

**Props：**

- 使用 `interface` 定义 props 类型
- 使用 `defineProps` + `withDefaults`（如有默认值）
- Prop 命名使用 `camelCase`

**Emits / 事件：**

- 使用 `defineEmits` 显式声明
- 事件命名规则：
  - v-model 对应：`update:xxx`
  - 其他事件统一使用 `onXxx` 风格的回调命名（对外暴露时）

### 2.3 组合式 API 使用

- 简单原始值：优先使用 `ref`
- 复杂对象：使用 `reactive` 或 `ref({ ... })`，不要滥用深层嵌套
- 派生状态：必须使用 `computed`
- 副作用：使用 `watch` / `watchEffect`，避免在 template 中写复杂表达式

---

## 三、模板（Template）规范

### 3.1 结构与可读性

- 模板结构优先与业务结构对齐：从外到内「布局 → 模块 → 元素」
- 避免在模板中写复杂表达式与逻辑判断，将逻辑放在脚本中
- 避免多层嵌套的 `v-if / v-for`，必要时拆子组件

### 3.2 Element Plus 使用约定

- 表单类组件统一使用 Element Plus（如 `el-form`, `el-input`, `el-select` 等）
- 表格统一使用 `el-table`，列配置遵循后续表格相关 skill
- 弹窗统一使用 `el-dialog`，按钮使用 `el-button`
- 统一使用 `v-model` 而不是手写 `:model-value` + `@update:model-value`，除非有特殊需求

### 3.3 Tailwind 使用约定

- 布局、间距、对齐、字体等优先使用 Tailwind 工具类
- 尽量避免在 `<style>` 里写简单的 margin/padding，使用 Tailwind 替代
- 对于复杂、复用性强的样式，再放到 `<style scoped lang="scss">` 中

---

## 四、样式（Style）规范

### 4.1 基本要求

- 必须使用：`<style scoped lang="scss">`
- 禁止在组件中写全局样式（全局样式统一在全局样式文件中维护）
- 优先：Tailwind 负责「通用布局 + 间距 + 配色」，SCSS 负责「组件自身结构」

### 4.2 类名与结构

- 建议采用简洁、语义化的类名，例如：`user-table`, `search-form`
- 避免深层级选择器（超过 3 级嵌套尽量拆开）

---

## 五、组件职责与抽象

### 5.1 单一职责

- 每个组件只负责一个明确的「UI 片段」或「业务片段」
- 不要把过多逻辑堆在一个组件里，逻辑复杂时优先：
  - 抽到 `composables/useXxx.ts`
  - 抽为更小的子组件

### 5.2 复用策略

- 出现同一块 DOM + 逻辑 2 次以上：
  - 优先考虑抽为公共组件（放到 `components/`）
  - 或抽为 composable（放到 `composables/`）

---

## 六、与 Store / API / Composable 的关系

- 组件本身只做「展示 + 交互触发」，不直接堆叠大量业务流程
- 与后端交互：
  - 优先通过 `@/api/...` 模块函数
  - 或通过 `useXxxStore()` / `useXxx` composable 间接调用
- 当逻辑可以被多个页面/组件使用时，必须优先抽到 composable 或 store，而不是在多个组件中复制粘贴

