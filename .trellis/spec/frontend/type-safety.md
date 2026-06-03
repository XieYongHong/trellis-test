# 类型安全

> 目标：在历史模块可渐进改造的前提下，为新增和改造代码补齐关键边界类型，避免用大范围 `any` 掩盖契约问题。

## 基本原则

- 新增 Vue SFC 使用 `<script setup lang="ts">`。
- 新增 props、emits、API 参数、API 返回、表单模型、route query、筛选条件、store state/action 应有明确类型。
- 历史模块允许渐进式增强；不要为了修一个窄问题大范围重写类型。
- 必须使用 `any` 时缩小作用域，并优先在边界转换后回到具体类型。

## 类型落点

- 页面局部类型：同目录 `types.ts`、`typing.ts`、`types.d.ts` 或 `typing.d.ts`，跟随相邻模块。
- API 类型：与 `api/*.ts` 同目录或模块级 `types`，避免散落在组件里。
- 组件 props/emits 类型：组件文件内或同级类型文件。
- 路由、菜单、注册点类型：优先复用 `@jetlinks-web-core/router/types`、store、utils 或 registry 已有类型。
- 条件筛选类型：优先从 `@jetlinks-web-core/components/ConditionFilter` 导入，例如 `ConditionFilterField`、`ConditionFilterTerm`、`ConditionFilterChangePayload`。

## Props / Emits

- props 对象较复杂时定义独立 interface。
- emits 使用类型签名表达事件名与 payload。
- 不用 `Record<string, any>` 作为组件公开契约，除非组件本身就是透传容器；透传时也要说明透传对象来源。

## API 与表单

- API 请求参数和响应结构稳定时必须补类型。
- 表单模型与 API DTO 不一致时，显式写转换函数，不在提交处临时拼接散乱对象。
- 后端字段可能为空时用 `null | undefined` 表达，不假设接口总是完整。
- 枚举状态、权限动作、类型码优先定义联合类型或复用已有常量，不在页面多处硬编码字符串。

## 条件筛选与路由 query

- 复杂筛选优先复用 `ConditionFilter` 类型。
- query 编码前后的结构要有类型边界：`ConditionFilterTerm[]`、接口 `terms`、route `q` 分别明确。
- `route.query` 默认是宽类型，进入业务前要转换为业务类型，不在页面中反复 `as string`。

## 第三方与历史 JS

- 历史 `.js` 文件可保持，但新增 TS 文件不要继续扩大无类型区域。
- 引入第三方库缺少类型时，优先找已有声明或补最小 `.d.ts`，不要全局声明成 `any`。
- 对 `import.meta.glob` 结果定义模块类型，尤其是动态组件、配置、manifest。

## 反模式

- `const data = ref<any>({})` 后在模板中随意访问深层字段。
- 大范围 `as any`、`as unknown as T` 绕过错误。
- 表单对象、API 参数、列表项三者混用一个无约束类型。
- route query、localStorage、接口返回不转换就直接当业务类型使用。
- 为了通过类型检查删除关键空值判断。

## 自检清单

- 新增公开 props/emits 是否有类型。
- 新增 API 参数、响应、表单、列表项是否有类型。
- 是否避免新增无边界 `any`。
- 是否处理接口空值、数组空值、route query 宽类型。
- 类型是否放在靠近使用者的位置，且没有跨模块深层引用私有类型。
