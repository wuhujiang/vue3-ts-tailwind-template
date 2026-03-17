你是资深前端工程师，在这个项目中，当用户在 `@/api/` 下新建或维护 **接口模块** 时，必须遵循本 Skill。

本项目约定：

- 所有 HTTP 请求通过统一封装的客户端（例如基于 axios 的实例）
- 组件 / Store / composable 不直接写裸 `fetch` / `axios`，统一通过 `@/api/...` 暴露的函数调用
- 接口函数命名与后端资源语义一致

---

## 一、目录与文件命名

- 所有接口模块统一放在：`src/api/` 目录下
- 按业务域拆分文件，例如：
  - `api/system/user.ts`
  - `api/system/role.ts`
  - `api/common/upload.ts`

文件内只导出与该领域相关的接口函数，不混放无关业务。

---

## 二、HTTP 客户端封装（概念约定）

项目中应有一个统一的 HTTP 客户端封装，例如：

- `src/utils/request.ts` 或类似文件
- 内部配置：
  - 基础 URL
  - 请求/响应拦截器
  - 统一错误处理策略（如 token 校验、全局错误提示）

在 `@/api/...` 模块中：

- 只能使用这个封装好的客户端发送请求
- 不再重复创建 axios 实例或写原始 fetch

---

## 三、接口函数命名规范

接口函数命名需表达**资源 + 动作**，典型 CRUD 规则：

- 列表：
  - `listUser`, `listRole`, `listXxx`
- 详情：
  - `getUserDetail`, `getRoleDetail`, `getXxxDetail`
- 新增：
  - `addUser`, `addRole`, `addXxx`
- 更新：
  - `updateUser`, `updateRole`, `updateXxx`
- 删除：
  - `deleteUser`, `deleteRole`, `deleteXxx`

其他常见操作：

- 启用 / 禁用：
  - `enableUser`, `disableUser`
- 导入 / 导出：
  - `importUser`, `exportUser`

---

## 四、参数与返回值类型

所有接口函数必须使用 TypeScript 类型：

- 为请求参数定义接口：
  - 如：`ListUserParams`, `CreateUserPayload`, `UpdateUserPayload`
- 为响应定义接口：
  - 如：`UserItem`, `UserListResponse`

接口函数返回值：

- 统一返回 `Promise<具体类型>`，例如：
  - `Promise<UserListResponse>`
- 如项目封装已在 HTTP 客户端中做了 `res.data` 解包：
  - 则 API 函数返回类型直接对应业务数据类型

---

## 五、分页与查询参数规范

对于分页列表接口：

- 统一使用约定好的分页字段名称，例如：
  - `pageNum` / `pageSize` 或
  - `current` / `size`
- 查询参数应统一放在一个对象中，例如：
  - `{ pageNum, pageSize, keyword, status }`

避免在多个地方手写不同的字段名，保持与后端约定一致。

---

## 六、错误处理与异常情况

错误处理优先在 HTTP 客户端封装中统一实现，例如：

- 处理网络错误、超时
- 根据状态码统一提示（如 401 跳登录、403 提示无权限等）

在 `@/api/...` 中：

- 一般不直接调用消息组件（如 `ElMessage`）
- 出错时可以：
  - 直接抛出错误，让调用方 `try/catch`
  - 或返回一个约定的错误结果，让调用方根据结果处理

---

## 七、安全与敏感信息

- 不在接口模块中硬编码敏感信息（如 token、密钥等）
- token 注入统一通过 HTTP 客户端的拦截器完成
- 与认证相关的接口统一在专门的模块中维护，例如：
  - `api/auth.ts`，包含 `login`, `logout`, `refreshToken` 等

---

## 八、接口模块与调用方的关系

- 组件 / 页面 / composable / Store：
  - 只能通过 `@/api/...` 暴露的函数访问后端
  - 不应依赖 HTTP 客户端的具体实现细节
- 重构/替换 HTTP 客户端时：
  - 尽量保证 `@/api/...` 层的接口签名稳定，减少业务层改动

当需要新增接口时：

- 优先在对应业务模块文件中新增函数
- 遵循命名规则与类型定义要求，不要在组件中直接写请求逻辑

