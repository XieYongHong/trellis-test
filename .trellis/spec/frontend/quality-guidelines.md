# 质量规范

> 目标：前端改动必须可复用、可维护、可验证。不要把已知规范问题留给“后续优化”，除非用户明确接受风险。

## 必须遵守

- 先核验工作区事实，再写代码：真实导出、真实脚本、目标模块入口、相邻实现。
- 优先复用 `@jetlinks-web/*`、`@jetlinks-web-core/*`、`jetlinks-web-core/src/*` 和目标模块已有能力。
- 用户可见文案走当前模块 i18n。
- 页面壳层、主筛选、主列表、主详情变化必须先形成页面方案；局部调整白名单除外。
- Vue/JSX/TSX 文件超过 300 行必须拆分；窄修已有大文件例外要说明。
- 请求、参数组装、业务编排不要进入展示组件。
- 不提交调试日志、注释掉的废弃代码、无意义注释、临时代码块或与行为不一致的旧注释。

## Vue Auto Import

`jetlinks-web-core/vite.config.ts` 启用了 `unplugin-auto-import`，自动导入 `vue` 和 `vue-router`。

- `.vue` / `script setup` 中不要重复导入已自动注入的 API，例如 `ref`、`reactive`、`computed`、`watch`、`onMounted`、`useRoute`、`useRouter`。
- `import type { ... } from 'vue'` 可以保留。
- 如果文件不在自动导入覆盖范围或确需显式导入，在代码结构上保持相邻文件风格。

## 复用检查

新增组件、hook、service、util 前按顺序查：

1. 当前页面同目录。
2. 当前模块 `components/`、`hooks/`、`utils/`、`api/`、`services/`。
3. 同业务域兄弟模块。
4. `@jetlinks-web/components`、`@jetlinks-web/hooks`、`@jetlinks-web/utils`、`@jetlinks-web/core`。
5. `jetlinks-web-core/src/components`、`src/hooks`、`src/store`、`src/utils`。
6. 公共 module registry、components registry、运行时扩展点。

能通过配置、props、slots、字段定义或扩展点复用时，不新增平行实现。

## 关联领域复用检查

当前功能需要使用其他业务对象时，必须先查对象归属领域能力，不在当前页面重复封装。

检查示例：

- 用户新增选择角色：查角色域组件/API/hook，不在用户域重复写角色查询。
- 设备选择产品：查产品域能力，不在设备页复制产品选项接口。
- 通知规则选择用户、角色、组织：分别查用户、角色、组织能力。
- 业务表单选择字典项：查字典域或通用字典组件。

质量要求：

- PRD 或任务说明记录依赖对象、归属领域、已查能力和处理方式。
- 新增 API 前先搜索同 endpoint、同对象名、同选择组件。
- 新增选项转换前先确认是否已有通用选择器、远程选项 hook 或字段定义能力。
- 跨模块使用时不要 deep import 其他业务模块私有页面组件；优先用公共组件、公共 API、注册能力或上提共享层。
- 如果确实新增当前功能适配层，说明为什么对象归属领域现有能力不够。

## 页面结构检查

- 页面第一屏必须服务用户第一任务。
- 只有录入、查询、批量操作、状态管理明确为核心任务时，才按标准管理页处理。
- 监控、分析、排障、流程推进、对象关系理解优先考虑工作台、详情、分步流、概览、时间线、树表、分组页。
- 不增加没有真实数据源、刷新机制和动作承接的统计卡、图表、趋势或排行榜。

## i18n 与文案检查

- 页面标题、区块标题、字段展示名、列头、按钮、Tab、占位文案、空态/错态/加载态、Tooltip、校验消息、枚举显示值走 i18n。
- 最终界面不出现 `TODO`、`待接接口`、`占位文案`、`设计意图`、`交互方式`、字段 key、API path、权限码、组件名等开发态文字。
- 空态/错态说明对象和下一步动作，不只写“暂无数据”。

## 样式检查

- 优先使用 Ant Design Vue 默认能力、`jetlinks-web-core/src/style.css`、Less 变量或 Tailwind `jet-*` token。
- 功能块间距按语义关系选择 token 或相邻组件默认间距，不临时写孤立 `10px`、`14px`、`18px`、`22px`。
- 不新增脱离现有框架的品牌色、字体体系、重型阴影、装饰背景。
- 不用单侧彩色条作为主要状态信号。

## 验证命令

优先按改动范围选择：

```bash
pnpm dev
pnpm dev:proxy localhost:8844
pnpm build
pnpm test
pnpm -F jetlinks-web-core build -- --module-name <module-name>
```

如果无法运行，最终说明：

- 未验证项。
- 建议执行命令。
- 剩余风险。

## 文档自检

修改 `.trellis/spec` 后运行：

```bash
rg "[T]o be filled|[T]ODO: fill|p[l]aceholder|[R]eplace with your actual" .trellis/spec
```

并检查：

- `index.md` 是否列出所有实际专题。
- 新增链接是否存在。
- 文档是否描述当前项目，而不是模板或旧项目。

## 最终回复要求

前端任务完成时说明：

- 前端任务类型。
- 目标模块。
- 页面结构选择。
- 复用能力。
- 关键文件职责。
- 是否存在超过 300 行的 Vue/JSX/TSX 文件。
- 验证命令和剩余风险。
