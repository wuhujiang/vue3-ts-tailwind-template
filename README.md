# my-pro

## 项目初始化说明

本项目使用 Vite + Vue3 + TypeScript + Tailwind CSS + Pinia + Axios(后期可能更换ofetch<V1>) + Vue Router 技术栈，使用 pnpm 作为包管理器。

格式规范化极尽简化，过犹不及。可选根据团队落地添加其他的，如：styleLint...

### 初始化步骤

1. 克隆项目
2. 安装依赖：`pnpm install`
3. 启动开发服务器：`pnpm dev`

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
├── eslint.config.js       # ESLint 配置
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # 应用程序 TypeScript 配置
├── tsconfig.node.json     # Node.js TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 技术栈

- **前端框架**：Vue 3
- **构建工具**：Vite
- **类型系统**：TypeScript
- **CSS 框架**：Tailwind CSS v4（`@tailwindcss/vite` 插件集成）
- **CSS 预处理**：SCSS
- **状态管理**：Pinia
- **HTTP 客户端**：Axios
- **路由**：Vue Router
- **API Mock**：MSW（Mock Service Worker）
- **代码规范**：ESLint（@antfu/eslint-config）+ lint-staged
- **提交规范**：Commitlint + Husky
- **生产压缩**：Terser（prod / pre 环境启用，移除 console 和 debugger）

## 核心功能

1. **自动注册组件**：`src/components` 目录下的组件通过 `plugins/autoImportComponents.ts` 自动注册
2. **状态管理**：使用 Pinia 进行状态管理
3. **路由管理**：Vue Router 路由管理，支持路由守卫（`router/guards.ts`）
4. **API 调用**：Axios 统一封装，按模块组织接口，类型独立管理（`api/types/`）
5. **Mock 数据**：基于 MSW 拦截请求，开发阶段无需后端即可调试接口
6. **多环境配置**：通过 `.env` / `.env.local` / `.env.test` 管理不同环境变量
7. **代码规范**：ESLint + lint-staged，提交时仅校验暂存文件
8. **提交规范**：Commitlint + Husky 确保提交消息符合 Conventional Commits
9. **类型安全**：TypeScript 全覆盖
10. **构建优化**：生产环境使用 Terser 压缩、自定义输出目录结构

## 常用命令

| 命令                | 描述                       |
| ------------------- | -------------------------- |
| `pnpm dev`          | 启动开发服务器             |
| `pnpm build`        | 构建生产版本               |
| `pnpm preview`      | 预览生产构建               |
| `pnpm lint`         | 运行 ESLint 检查           |
| `pnpm lint:fix`     | 运行 ESLint 检查并自动修复 |
| `pnpm prepare`      | 初始化 Husky 钩子          |
| `npx tsc --noEmit`  | 运行 TypeScript 类型检查   |

## 代码规范

项目使用 @antfu/eslint-config 配置，主要规则：

- Vue 相关规则（强制 `template → script → style` 块顺序）
- TypeScript 相关规则
- 代码风格：2 空格缩进、单引号、启用分号
- 格式化：CSS / SCSS / HTML 文件由 ESLint Formatter 处理
- 忽略 mocks、assets/images、JSON、Markdown 等文件

## 提交规范

项目使用 Conventional Commits 规范，通过 Commitlint + Husky 进行校验。

### 提交消息格式

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

其中 type 可以是：

- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码风格调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建或依赖更新

## 开发指南

### 组件开发

1. 在 `src/components` 目录下创建组件文件夹（PascalCase 命名）
2. 在文件夹中创建 `index.vue` 文件
3. 在 `<script setup lang="ts">` 中使用 TypeScript 语法
4. 组件会通过 `plugins/autoImportComponents.ts` 自动注册，无需手动导入

### 状态管理

1. 在 `src/stores` 目录下创建 store 文件（.ts 扩展名）
2. 使用 `defineStore` 定义状态管理
3. 使用 TypeScript 类型定义状态和方法

### 路由配置

1. 在 `src/views` 目录下创建页面组件
2. 在 `src/router/routes.ts` 中定义路由表
3. 在 `src/router/guards.ts` 中添加路由守卫逻辑
4. 路由实例在 `src/router/index.ts` 中创建并导出

### API 调用

1. 在 `src/api/axios.ts` 中配置 Axios 实例和拦截器
2. 在 `src/api/types/` 中定义请求 / 响应类型（如 `common.ts` 放通用类型，`report.ts` 放模块类型）
3. 按业务模块在 `src/api/` 下创建子目录（如 `system/`、`test/`），在其中编写具体接口函数

### Mock 数据

1. 在 `src/mocks/modules/` 下按模块创建 Mock Handler（如 `report.ts`）
2. 在 `src/mocks/handlers.ts` 中汇总所有 Handler
3. MSW 在 `src/mocks/browser.ts` 中初始化，开发环境自动启用
