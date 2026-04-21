---
name: types-structure
description: 当用户为接口或业务编写 TypeScript 类型时使用此技能
---

你是资深前端工程师，在这个项目中，当用户为接口或业务编写 **TypeScript 类型** 时，必须遵循本 Skill，统一使用 `src/types/` 目录来管理类型。

本项目约定：

- 统一使用 **interface** 定义结构类型（尽量避免 `type` 对象别名和 `enum`）
- 接口类型与业务模型分层管理，避免「到处随手写类型」
- 所有与后端交互相关的通用结构（分页、通用响应等）都集中在 `src/types/` 下

---

## 一、目录整体结构

推荐的 `src/types/` 目录结构如下（可按业务扩展）：

- `src/types/index.ts`：全局公共类型入口（导出常用基础类型）
- `src/types/common/`：通用类型（与具体业务无关）
  - `src/types/common/api.ts`：API 通用响应、错误结构、分页结果等
  - `src/types/common/pagination.ts`：分页参数、分页结果基础类型
- `src/types/system/`：系统相关业务类型
  - `src/types/system/user.ts`：用户相关业务模型
  - `src/types/system/role.ts`：角色/权限相关业务模型
- `src/types/test/`：测试/演示模块业务类型
  - `src/types/test/report.ts`：报表相关业务模型

命名规则：

- 目录名：小写或 kebab-case（如 `common`, `system`, `test-report`）
- 文件名：按业务域划分，如 `user.ts`, `role.ts`, `report.ts`
- 接口名：PascalCase，例如：`User`, `Role`, `ReportItem`, `PageParams`

---

## 二、「API 类型」与「业务类型」的分层原则

### 2.1 业务类型（Domain Model）

业务类型是项目中反复使用的领域模型，比如：

- 用户：`User`
- 角色：`Role`
- 权限：`Permission`
- 报表：`ReportItem`, `ReportDetail`

这些类型：

- 放在对应的业务子目录下，例如：
  - `src/types/system/user.ts` 中定义 `User`
  - `src/types/system/role.ts` 中定义 `Role`
- 用途：
  - 组件 / 页面 / Store / composable 等任何地方都可以复用

### 2.2 API 类型（Request / Response）

API 类型是与具体接口强绑定的结构，例如：

- 请求参数：`ListUserRequest`, `CreateUserRequest`, `UpdateUserRequest`
- 响应体：`ListUserResponse`, `GetUserDetailResponse`

推荐策略：

- **优先复用业务模型**：
  - 比如 `ListUserResponse` 中的每一项列表元素使用 `User` 类型
- 接口专用类型：
  - 可以就近定义在对应的 `@/api/...` 文件顶部
  - 或在对应业务类型文件中配套定义明确命名后再导入使用

分层原则总结：

- **业务模型（User/Role/...）**：放在 `src/types/业务模块/*.ts`
- **接口专用类型**（特别是只在一个接口文件中用到的中间结构）：
  - 优先就近放在 `api` 文件顶部
  - 若多个地方会复用，再提升到 `src/types/` 中

---

## 三、`src/types/common`：通用类型规范

通用类型集中在 `src/types/common/`，不绑定特定业务模块：

- `src/types/common/api.ts`：
  - 通用响应包装类型，例如：
    - `ApiResult<T>`：后端统一响应封装
    - `PageResult<T>`：分页列表响应数据
  - 通用错误结构（如后端错误码、错误信息）
- `src/types/common/pagination.ts`：
  - `PageParams`：分页请求参数（如 `pageNum`, `pageSize` 或 `current`, `size`）
  - `PageMeta`：分页元信息（如总条数、当前页、总页数等）

所有列表接口的分页参数、分页结果都应尽量复用这些通用类型，避免各自定义不同字段名。

---

## 四、`src/types/index.ts`：统一出口

`src/types/index.ts` 作为类型集中出口，主要做：

- 统一导出常用基础类型（例如 `PageParams`, `PageResult`, `ApiResult`）
- 按需重新导出部分核心业务模型（例如 `User`, `Role`）

建议：

- 只在 `index.ts` 中导出**高频使用**的类型，避免把所有类型都塞进来导致入口混乱
- 业务较细的类型由各业务模块直接从对应文件导入（例如直接从 `src/types/system/user` 导入）

---

## 五、在 `api` 模块与业务代码中如何使用类型

### 5.1 在 `@/api/...` 中

- 对于**单个接口专用类型**（只在这一个文件使用）：
  - 可以在对应的 `api` 文件顶部定义 request/response 接口
- 对于**复用度高的业务模型**：
  - 从 `src/types/业务模块/*.ts` 中导入，例如：
    - `import type { User } from '@/types/system/user'`
  - 然后在接口返回值类型中使用，如：
    - `Promise<PageResult<User>>`

### 5.2 在组件 / Store / composable 中

- 直接导入对应的业务模型类型：
  - `import type { User } from '@/types/system/user'`
- 或导入常用通用类型：
  - `import type { PageParams, PageResult } from '@/types'`

避免在组件、Store 内部随手重新定义一次结构相同的类型，应尽量复用 `src/types/` 中已有定义。

---

## 六、具体约定与注意事项

- **优先使用 interface**：
  - 例如：`export interface User { ... }`
  - 方便扩展与合并定义
- **避免使用 enum**：
  - 若需常量枚举，优先使用对象字面量 + `as const` 或类型联合
- **命名清晰**：
  - 类型名必须能表达语义，避免 `Data`, `Result` 这种过于泛的名称
- **尽量避免 any**：
  - 如果暂时不清楚类型，也应先用更窄的结构（如 `Record<string, unknown>`）并在后续完善

---

## 七、团队使用小结

当你需要新建一个类型时，优先按照以下顺序思考：

1. 这是「业务模型」还是「接口专用结构」？
   - 业务模型 → 放到 `src/types/对应业务模块/*.ts`
   - 接口专用 → 先就近写在 `api` 文件顶部
2. 这个类型会被多个模块复用吗？
   - 是 → 抽到 `src/types/`（common 或业务子目录），从那里导入
3. 是否可以复用已有类型或在其基础上扩展？
   - 避免重复造轮子，优先复用并扩展现有接口

只要团队统一遵循以上结构和规则，`src/types/` 就会成为一个干净、可预期的类型中心，既方便查找，又方便维护。
