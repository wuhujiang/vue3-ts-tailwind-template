# Vue 3 + TypeScript + Tailwind CSS 项目模板

现代化的 Vue 3 项目模板，集成了 TypeScript、Tailwind CSS、Pinia、Vue Router 等主流技术，提供完整的开发规范和最佳实践。

## 快速开始

### 系统要求

- Node.js 18.0+
- pnpm 9.0+ (包管理器)

### 初始化步骤

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd vue3-ts-tailwind-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

   浏览器访问 `http://localhost:5173`

4. **初始化 Husky 钩子** (可选)
   ```bash
   pnpm prepare
   ```

## 项目结构

```text
my-pro/
├── .husky/                # Git 钩子配置
│   ├── commit-msg         # 提交消息校验钩子
│   └── pre-commit         # 提交前 lint-staged 钩子
├── .trae/                 # 项目规则配置
├── .vscode/               # VS Code 编辑器配置
├── public/                # 静态资源
│   ├── mockServiceWorker.js  # MSW Service Worker 文件
│   └── vite.svg
├── src/
│   ├── api/               # API 接口层
│   │   ├── system/        # 系统模块接口（如 user.ts）
│   │   ├── test/          # 测试模块接口（如 report.ts）
│   │   ├── types/         # 接口类型定义（common.ts、report.ts）
│   │   └── axios.ts       # Axios 实例与拦截器配置
│   ├── assets/            # 静态资源（图片、SVG 等）
│   ├── components/        # 公共组件（PascalCase 目录命名）
│   │   └── TestComponent/
│   │       └── index.vue
│   ├── composables/       # 组合式函数（useXxx）
│   ├── constants/         # 常量定义
│   ├── mocks/             # MSW Mock 数据
│   │   ├── modules/       # 按模块拆分的 Mock Handler（如 report.ts）
│   │   ├── browser.ts     # MSW 浏览器端 Worker 初始化
│   │   └── handlers.ts    # Mock Handler 汇总入口
│   ├── plugins/           # 插件
│   │   ├── autoImportComponents.ts  # 组件自动注册
│   │   └── index.ts       # 插件汇总入口
│   ├── router/            # 路由配置
│   │   ├── guards.ts      # 路由守卫
│   │   ├── index.ts       # 路由实例
│   │   └── routes.ts      # 路由表定义
│   ├── stores/            # Pinia 状态管理
│   │   └── counter.ts
│   ├── styles/            # 样式文件
│   │   ├── index.scss     # SCSS 全局变量 / Mixin 入口（Vite 自动注入）
│   │   ├── main.css       # Tailwind CSS 入口
│   │   ├── reset.scss     # 样式重置
│   │   └── var.scss       # SCSS 变量定义
│   ├── utils/             # 工具函数
│   ├── views/             # 页面视图
│   │   ├── About.vue
│   │   └── Home.vue
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── .env                   # 默认环境变量
├── .env.local             # 本地环境变量（不提交）
├── .env.test              # 测试环境变量
├── .gitignore
├── README.md
├── env.d.ts               # TypeScript 类型声明
├── .oxlintrc.json      # OXLint 配置
├── .oxfmtrc.json      # Oxfmt 配置
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # 应用程序 TypeScript 配置
├── tsconfig.node.json     # Node.js TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 技术栈

### 核心框架

- **前端框架**：Vue 3
- **构建工具**：Vite
- **类型系统**：TypeScript 5.9+
- **CSS 框架**：Tailwind CSS v4（`@tailwindcss/vite` 插件集成）
- **CSS 预处理**：SCSS

### 状态管理 & 路由

- **状态管理**：Pinia
- **路由**：Vue Router 5

### HTTP & Mock

- **HTTP 客户端**：Axios
- **API Mock**：MSW（Mock Service Worker）

### 开发工具 & 规范

- **代码规范工具**：Oxc
  - **Linter**：oxlint 1.60.0+ （代码静态检查）
  - **Formatter**：oxfmt 0.45.0+ （代码格式化）
- **Git 钩子**：Husky 9.1.7+
- **暂存文件校验**：lint-staged 16.3.1+
- **提交规范**：Commitlint 20.4.2+ （Conventional Commits）
- **代码压缩**：Terser （生产环境）

### 其他工具

- **组件库**：Element Plus （可选）
- **包管理器**：pnpm

## 核心功能

1. **自动注册组件**：`src/components` 目录下的组件通过 `plugins/autoImportComponents.ts` 自动注册
2. **状态管理**：使用 Pinia 进行状态管理
3. **路由管理**：Vue Router 路由管理，支持路由守卫（`router/guards.ts`）
4. **API 调用**：Axios 统一封装，按模块组织接口，类型独立管理（`api/types/`）
5. **Mock 数据**：基于 MSW 拦截请求，开发阶段无需后端即可调试接口
6. **多环境配置**：通过 `.env` / `.env.local` / `.env.test` 管理不同环境变量
7. **代码规范**：OXC（oxlint + oxfmt）+ lint-staged，提交时仅校验暂存文件
8. **提交规范**：Commitlint + Husky 确保提交消息符合 Conventional Commits
9. **类型安全**：TypeScript 全覆盖
10. **构建优化**：生产环境使用 Terser 压缩、自定义输出目录结构

## 常用命令

### 开发相关

| 命令           | 描述                                     |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | 启动开发服务器（Hot Module Replacement） |
| `pnpm build`   | 构建生产版本                             |
| `pnpm preview` | 预览生产构建结果                         |

### 代码质量

| 命令             | 描述                           |
| ---------------- | ------------------------------ |
| `pnpm lint`      | 运行 oxlint 检查代码           |
| `pnpm lint:fix`  | 运行 oxlint 检查并自动修复问题 |
| `pnpm fmt`       | 运行 oxfmt 格式化代码          |
| `pnpm fmt:check` | 检查代码格式是否符合规范       |

### Git & 提交

| 命令           | 描述                              |
| -------------- | --------------------------------- |
| `pnpm prepare` | 初始化 Husky 钩子（仅需运行一次） |

### 类型检查

| 命令               | 描述                                   |
| ------------------ | -------------------------------------- |
| `npx tsc --noEmit` | 运行 TypeScript 类型检查（不生成文件） |

## 代码规范与质量

### Oxc 工具链

本项目使用 **Oxc** 进行代码检查和格式化，包括两个主要工具：

#### oxlint - 静态代码检查

- **配置文件**：`.oxlintrc.json`
- **检查规则**：
  - Vue 相关规则（强制 `<template>` → `<script>` → `<style>` 块顺序）
  - TypeScript 相关规则
  - JavaScript 最佳实践
  - 通用代码规范

#### oxfmt - 代码格式化

- **配置文件**：`.oxfmtrc.json`
- **格式化范围**：Vue、TypeScript、JavaScript、CSS、SCSS、HTML、JSON
- **格式化规则**：
  - 缩进：2 空格
  - 字符串引号：单引号
  - 行尾分号：启用
  - 代码行宽度：自动换行
- **保存时自动格式化**：VS Code 扩展 `oxc.oxc-vscode` 支持

### 文件忽略规则

`.oxfmtrc.json` 中的 `ignorePatterns` 配置不格式化以下文件：

- `public/mockServiceWorker.js` （MSW Service Worker）
- `**/fixtures` 和 `**/node_modules` （第三方代码）
- 所有 `.md` 和图片文件
- `**/ofetch/**` 和 `**/mocks/**` （Mock 相关文件）

### VS Code 配置

为获得最佳开发体验，建议安装以下 VS Code 扩展：

#### 推荐扩展 (.vscode/extensions.json)

- **Vue.volar** - Vue 3 官方语言支持
- **oxc.oxc-vscode** - Oxc 集成（代码检查 + 格式化）
- **usernamehw.errorlens** - 错误信息行内显示

#### VS Code 设置 (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "oxc.fmt.configPath": ".oxfmtrc.json",
  "[vue]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  }
}
```

### Git 钩子与提交规范

#### Husky + lint-staged

- **pre-commit**：提交前自动运行 `oxlint --fix` 检查和修复暂存文件
- **commit-msg**：校验提交消息格式

#### Conventional Commits 规范

提交消息格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**type 类型**：

- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档更新
- `style`：代码风格调整（不改变功能）
- `refactor`：代码重构（不改变功能）
- `test`：测试相关
- `chore`：构建、依赖或工具更新

**示例**：

```
feat(api): add user authentication endpoint

- Implement JWT token validation
- Add error handling for invalid tokens

Closes #123
```

## Trae Skills 系统

本项目使用 **Trae** 框架的 Skills 系统来规范化开发流程。Trae Skills 提供与上下文相关的开发指南，确保团队成员按照统一的标准进行开发。

### 可用的 Skills

位置：`.trae/skills/`

| 技能名称                | 文件位置       | 使用场景               |
| ----------------------- | -------------- | ---------------------- |
| **vue-page-view**       | `views/`       | 创建或修改页面级组件   |
| **vue-component-basic** | `components/`  | 创建或修改基础组件     |
| **useXxx**              | `composables/` | 创建或修改自定义 Hooks |
| **pinia-store**         | `store/`       | 创建或修改 Pinia Store |
| **route-config**        | `router/`      | 创建或修改路由配置     |
| **http-client**         | `api/`         | 创建或维护接口模块     |
| **types-structure**     | `types/`       | 定义 TypeScript 类型   |

### 如何使用 Skills

每个 Skill 包含以下内容：

- **前言**：说明该技能的适用场景
- **文件位置与命名**：标准的目录和文件命名规范
- **最佳实践**：具体的编码建议
- **示例**：代码示例和参考

使用 AI 编辑器助手时，可以告诉它使用特定的 Skill，它会自动应用相关的规范和最佳实践。

## 开发指南

### 组件开发

参考技能：**vue-component-basic** (`./.trae/skills/vue-component-basic/SKILL.md`)

1. 在 `src/components` 目录下创建组件文件夹（**PascalCase** 命名，如 `UserList/`）
2. 在文件夹中创建 `index.vue` 文件
3. 使用 `<script setup lang="ts">` 语法
4. 组件样式使用 `<style scoped lang="scss">`
5. 组件会通过 `plugins/autoImportComponents.ts` **自动注册**，无需手动导入

### 页面视图开发

参考技能：**vue-page-view** (`./.trae/skills/vue-page-view/SKILL.md`)

页面组件是整个页面的顶级容器，通常包含以下特点：

- 调用 API 获取数据
- 管理页面级状态或使用 Pinia Store
- 组织多个子组件
- 处理路由参数

1. 在 `src/views` 目录下创建页面文件（**PascalCase** 命名，如 `UserManagement.vue`）
2. 页面加载时可在 `onMounted` 中获取数据
3. 复杂的页面状态应提取到 Pinia Store
4. 页面逻辑复用应提取到 Composable

### 自定义 Hooks（Composables）

参考技能：**useXxx** (`./.trae/skills/composables/useXxx/SKILL.md`)

Composable 用于封装**可复用逻辑**，如状态管理、API 调用、交互逻辑等。

1. 在 `src/composables/` 下创建文件（**camelCase** 命名，如 `useUserList.ts`）
2. 导出的函数名称必须以 `use` 开头（如 `useUserList`, `useDialog`）
3. 返回对象必须包含暴露的状态、计算属性和方法

### 状态管理（Pinia Store）

参考技能：**pinia-store** (`./.trae/skills/store/pinia-store/SKILL.md`)

1. 在 `src/stores/` 下创建 Store 文件（**camelCase** 命名，如 `userStore.ts`）
2. 使用 **Setup Store** 风格：`defineStore('id', () => { ... })`
3. 按业务域拆分 Store，避免一个大 Store
4. 使用 TypeScript 类型定义状态和 actions

### 路由配置

参考技能：**route-config** (`./.trae/skills/routing/route-config/SKILL.md`)

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/routes.ts` 中定义路由表
3. 在 `src/router/guards.ts` 中添加路由守卫
4. 路由跳转优先使用 `name` 而非 `path`

### API 调用

参考技能：**http-client** (`./.trae/skills/api/http-client/SKILL.md`)

1. 在 `src/api/axios.ts` 中配置 Axios 实例和拦截器
2. 在 `src/api/types/` 中定义请求/响应类型
   - `common.ts` 放通用类型（如分页、通用响应）
   - 模块类型文件（如 `user.ts`, `report.ts`）
3. 按业务模块在 `src/api/` 下创建子目录，编写接口函数

**接口命名规范**（CRUD 操作）：

- 列表：`listUsers`, `listReports`
- 详情：`getUser`, `getReport`
- 创建：`createUser`, `addReport`
- 更新：`updateUser`, `editReport`
- 删除：`deleteUser`, `removeReport`

### TypeScript 类型定义

参考技能：**types-structure** (`./.trae/skills/types-structure/SKILL.md`)

1. 统一使用 **interface** 定义结构类型（避免 `type` 和 `enum`）
2. 在 `src/types/` 下集中管理所有类型
3. 分层管理：业务类型 vs API 类型，避免混淆
4. 与后端交互的通用结构集中在 `src/types/`

### Mock 数据

1. 在 `src/mocks/modules/` 下按模块创建 Mock Handler（如 `user.ts`）
2. 在 `src/mocks/handlers.ts` 中汇总所有 Handler
3. MSW 在 `src/mocks/browser.ts` 中初始化，开发环境自动启用
4. `.oxfmtrc.json` 已配置忽略 Mock 文件格式化

## 环境变量配置

项目支持多环境配置：

- `.env` - 默认环境变量（提交到仓库）
- `.env.local` - 本地环境变量（**.gitignore** 忽略）
- `.env.test` - 测试环境变量

变量使用：`import.meta.env.VITE_API_BASE_URL`

## 常见问题

### 代码格式化问题

**Q: 保存文件时没有自动格式化？**

- 确保已安装 VS Code 扩展 `oxc.oxc-vscode`
- 在 `.vscode/settings.json` 中 `editor.formatOnSave` 设置为 `true`
- 重启 VS Code

**Q: 如何手动格式化？**

- 全项目：`pnpm fmt`
- 检查格式：`pnpm fmt:check`

### 代码检查问题

**Q: 代码检查失败，如何修复？**

- 自动修复：`pnpm lint:fix`
- 检查详情：`pnpm lint`

### 提交问题

**Q: 提交被 Husky 钩子拒绝？**

- Pre-commit 钩子会运行 `oxlint --fix` 检查暂存文件
- 自动修复后再提交，或手动运行 `pnpm lint:fix`
- Commit-msg 钩子检查消息格式，使用 Conventional Commits 规范

## 故障排查

### 依赖问题

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 端口被占用

```bash
pnpm dev -- --port 3000
```

### 类型错误

```bash
npx tsc --noEmit
```

## 相关文档

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Oxc 官方文档](https://oxc-project.github.io/)
