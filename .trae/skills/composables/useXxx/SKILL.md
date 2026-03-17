你是资深前端工程师，在这个项目中，当用户在 `composables/` 下新建或维护 **自定义 hooks（composable）** 时，必须遵循本 Skill。

本项目约定：

- 使用 **Vue 3 组合式 API**
- composable 用于封装**可复用逻辑**：状态管理、接口调用、通用交互流程等

---

## 一、文件位置与命名

- 目录：`src/composables/`
- 文件命名：`use-xxx.ts` 或 `useXxx.ts`，需与导出的函数名称对应
  - 函数名统一使用 `useXxx` 形式，例如：
    - `useUserList`, `useUserForm`, `useDialog`, `useRequest`

一个文件可以导出一个或少数高度相关的 composable，但避免一个文件什么都放。

---

## 二、适合抽为 composable 的场景

当满足以下任一条件时，应考虑抽出 composable：

- 同一段逻辑在 **两个及以上组件/页面中出现**
- 逻辑本身与具体 UI 结构无强耦合（即可以在多个不同组件中复用）
- 该逻辑可被视作一个「能力」或「行为」：
  - 如：列表管理、表单管理、轮询、上传流程、弹窗控制、请求管理等

---

## 三、入参与返回值规范

### 3.1 入参

- 入参推荐使用**对象参数**：
  - 便于扩展、阅读和传递（例如：`useUserList({ autoFetch: true })`）
- 为入参定义接口类型，注明可选字段与默认值

### 3.2 返回值

- 返回值统一为对象，包含：
  - `ref/ reactive` 状态
  - `computed` 派生状态
  - 公开的方法（如 `fetch`, `reset`, `submit`, `open`, `close`）
- 返回值字段命名要有清晰语义，避免 `data1`, `data2` 等无意义命名

示例（结构示意）：

- 返回内容中只暴露对外需要的接口，不把内部实现细节全部泄露出去。

---

## 四、与 API / Store / 组件的关系

- composable 可以：
  - 调用 `@/api/...` 模块封装的接口
  - 使用 Pinia Store（如 `useUserStore()`）
  - 暴露与 UI 相关的状态（如 `loading`, `visible` 等）
- composable 不应该：
  - 直接操作具体 DOM 元素
  - 假设使用它的组件的具体结构

推荐职责划分：

- **组件**：负责布局和模板（template）
- **composable**：负责业务逻辑和状态
- **Store**：负责全局或跨页面的共享状态

---

## 五、典型后台场景中的 composable 模式

1. **列表逻辑：`useXxxList`**
   - 管理：`list`, `pagination`, `loading`, `filters` 等
   - 提供方法：`fetchList`, `resetFilter`, `handlePageChange` 等
   - 内部使用对应的 `listXxx` API

2. **表单逻辑：`useXxxForm`**
   - 管理：`formModel`, `formRef`, `loading` 等
   - 提供方法：`initForm`, `submitForm`, `resetForm`
   - 内部使用 `addXxx`, `updateXxx`, `getXxxDetail` 等 API

3. **弹窗 / 抽屉：`useDialog` / `useDrawer`**
   - 管理：`visible` 状态
   - 提供方法：`open`, `close`, `toggle`

---

## 六、错误处理与用户提示

在 composable 中调用接口时：

- 推荐通过统一封装的 HTTP 客户端处理错误（如全局拦截器）
- 如需对调用方暴露错误：
  - 可以返回 `error` 状态或抛出错误，由调用组件决定如何提示

避免在 composable 内到处直接调用全局消息组件（如 `ElMessage`）：

- 更推荐：
  - 在 composable 中抛出错误 / 返回错误状态
  - 由组件根据具体场景决定是否提示用户以及如何提示

---

## 七、编写风格与可维护性

- composable 内部同样遵循统一顺序：
  - 类型定义 → 参数处理 → 响应式状态 → 计算属性 → watch → 业务方法 → 返回对象
- 逻辑复杂时，适当拆分为多个小函数，保持单个 composable 内部清晰
- 对于「为何这样设计」的非显而易见之处，添加简要注释说明即可

---

## 八、与页面 / 组件配合的实践建议

- 页面/组件在使用 composable 时：
  - 通过解构得到需要的状态和方法
  - 不应修改 composable 返回的只读计算属性
- 当一个 composable 被多个业务场景依赖时：
  - 修改时要注意兼容性
  - 必要时在 Skill 中补充说明「使用注意事项」

