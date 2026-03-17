你是资深前端工程师，在这个项目中，当用户**新建或修改 Pinia Store** 时，必须遵循本 Skill。

本项目约定：

- 使用 **Pinia** 作为全局状态管理
- 使用 **Setup Store 风格**：`defineStore('id', () => { ... })`
- Store 放在 `src/store/` 目录下，按业务域拆分

---

## 一、Store 文件与命名

- 目录约定（可根据项目实际微调）：
  - `src/store/user.ts`
  - `src/store/permission.ts`
  - `src/store/app.ts`
- Store 命名：
  - Store ID：小写 + 中划线或驼峰，例如：`user`, `permission`
  - Hook 名：`useXxxStore`，例如：`useUserStore`, `usePermissionStore`

一个文件原则上只包含一个 `defineStore`。

---

## 二、Setup Store 基本结构

Store 统一使用 Setup 写法，内部推荐顺序：

1. 类型定义（state 类型、接口）
2. `defineStore` 声明
3. state 定义（`ref` / `reactive`）
4. `computed` 派生状态（如需要）
5. `actions`（同步/异步方法）
6. `return` 暴露的 state / getters / actions

示意结构（伪代码）：

- `const useXxxStore = defineStore('xxx', () => { ... })`
- `return` 中只暴露外部需要使用的属性和方法，避免暴露内部实现细节。

---

## 三、State / Getter / Actions 规范

### 3.1 State

- 简单值使用 `ref`
- 复杂对象可以使用 `reactive` 或 `ref({ ... })`
- 状态命名清晰，表达业务语义，例如：
  - `userInfo`, `token`, `menuList`, `permissionCodes`

### 3.2 Getters（可用 `computed` 实现）

- 对 state 的派生运算尽量使用 `computed`
- 命名以 `xxxComputed` 或直接语义化名称，例如：`isLogin`, `hasPermission`

### 3.3 Actions

- 所有会修改 state 的逻辑必须通过 actions 完成
- 异步请求封装统一写在 actions 中，通过 `@/api/...` 模块调用后端接口
- Actions 命名表达行为，例如：
  - `login`, `logout`, `fetchUserInfo`, `setToken`, `resetState`

---

## 四、异步请求与错误处理

在 Store 中发起请求时：

- 必须通过 `@/api/...` 中封装的函数访问接口
- 在 actions 中处理：
  - `loading` 状态（如需要）
  - 成功时更新 state
  - 失败时根据项目约定进行错误处理（抛出错误或在此处处理提示）

推荐策略：

- Store 负责「数据状态」与「业务流程」
- 全局错误提示策略可统一在 HTTP 封装层处理

---

## 五、Store 的职责边界

- Store 适合处理：
  - 跨页面共享的全局数据（用户信息、权限、主题配置等）
  - 可复用的业务流程（登录登出、权限初始化）
- 不适合做：
  - 与单个页面强绑定的临时状态（优先放在页面或 composable 中）
  - 直接操作 DOM 或与组件强绑定的 UI 细节

当你发现某个 Store 变得非常庞大、包含多个无强关联的业务逻辑时，应考虑拆分为多个更小的 Store。

---

## 六、Store 与组件 / Composable 的使用方式

- 在组件与 composable 中使用 Store：
  - 通过 `const userStore = useUserStore()` 获取实例
  - 使用 `storeToRefs`（如项目中使用）将 state 转为响应式引用
- 组件中不应绕过 actions 直接修改 state
- 当多个页面或组件需要共享同一逻辑时：
  - 可以组合使用 Store + composable

---

## 七、重置与持久化（如项目中存在）

如果项目有重置 / 持久化需求，推荐：

- 为每个 Store 提供 `resetState` 方法，用于清空状态（例如登出时调用）
- 如有持久化（localStorage/sessionStorage），统一通过插件或封装的工具处理，不在 Store 中分散实现

---

## 八、代码风格与可维护性

- 保持 Store 文件简洁：
  - 类型定义清晰
  - 状态与行为分组合理
  - 单个 Store 职责明确
- 有较复杂逻辑时，适当加注释解释「为什么这样设计」，而不是简单描述「做了什么」。

