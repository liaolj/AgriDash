# AgriDash 农业 IoT 大屏原型

这是一个聚焦种植场景的农业 IoT 大屏前端原型。页面按照模块化设计，可根据后台配置勾选/排序展示不同功能模块，默认展示必选模块（顶部 KPI、农田分区格网）以及推荐的环境、灌溉、设备、告警模块。

## 功能概览

- **模块定义**：`app.js` 中包含所有必选与可选模块的定义，含默认显示状态与排序。
- **数据占位**：`sampleData` 对象提供了各模块的示例数据，便于原型展示。
- **配置模拟**：通过 `window.dashboardConfig` 覆盖默认配置，可验证模块显示/隐藏与排序的验收用例。
- **自适应布局**：`styles.css` 提供 12 列网格布局与大屏风格样式，支持常见分辨率。

## 本地预览

1. 在本仓库根目录启动任意静态服务器，例如：
   ```bash
   npx serve .
   ```
2. 浏览器访问输出的本地地址（通常为 `http://localhost:3000`）。
3. 如需模拟后台配置，在浏览器控制台注入：
   ```js
   window.dashboardConfig = {
     modules: [
       { id: "top-kpi", order: 1, enabled: true },
       { id: "map-grid", order: 2, enabled: true },
       { id: "environment", order: 3, enabled: true },
       { id: "devices", order: 4, enabled: true },
       { id: "alerts", order: 5, enabled: true },
       { id: "water", order: 6, enabled: false },
     ],
   };
   window.AgriDash.render(window.dashboardConfig);
   ```

## 自定义说明

- **新增模块**：在 `moduleDefinitions` 中新增模块对象，定义 `id`、`title`、`spanClass`、`render` 方法等信息即可。
- **对接后台**：将 `backendConfig` 替换为真实接口返回值后，调用 `renderDashboard` 即可与后端联动。

欢迎根据实际业务继续扩展阶段二、阶段三的更多模块与交互。
