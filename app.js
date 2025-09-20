const moduleDefinitions = [
  {
    id: "top-kpi",
    title: "顶部总览 KPI",
    spanClass: "grid-span-12",
    required: true,
    defaultOrder: 1,
    defaultEnabled: true,
    subtitle: "今日 / 本周核心指标",
    render: (container, data) => {
      const grid = document.createElement("div");
      grid.className = "module-content kpi-grid";

      const kpis = data.kpis ?? [];
      kpis.forEach((kpi) => {
        const card = document.createElement("div");
        card.className = "kpi-card";

        const label = document.createElement("div");
        label.className = "kpi-label";
        label.textContent = kpi.label;

        const value = document.createElement("div");
        value.className = "kpi-value";
        value.textContent = kpi.value;

        const trend = document.createElement("div");
        trend.className = "kpi-trend";
        trend.textContent = kpi.trend;

        card.append(label, value, trend);
        grid.appendChild(card);
      });

      container.appendChild(grid);
    },
  },
  {
    id: "map-grid",
    title: "农田分区格网",
    spanClass: "grid-span-8",
    required: true,
    defaultOrder: 2,
    defaultEnabled: true,
    subtitle: "农田区块状态概览",
    render: (container, data) => {
      const grid = document.createElement("div");
      grid.className = "module-content map-grid";

      const plots = data.plots ?? [];
      plots.forEach((plot) => {
        const card = document.createElement("div");
        card.className = "plot-card";

        const header = document.createElement("div");
        header.className = "plot-header";
        header.innerHTML = `<span>${plot.name}</span>`;

        const status = document.createElement("span");
        status.className = `plot-status ${plot.status}`;
        status.textContent = plot.statusLabel;
        header.appendChild(status);

        const metrics = document.createElement("div");
        metrics.className = "module-content";
        metrics.style.gap = "0.4rem";

        plot.metrics.forEach(([label, value]) => {
          const pair = document.createElement("div");
          pair.className = "metric-pair";
          pair.innerHTML = `<span>${label}</span><span>${value}</span>`;
          metrics.appendChild(pair);
        });

        card.append(header, metrics);
        grid.appendChild(card);
      });

      container.appendChild(grid);
    },
  },
  {
    id: "environment",
    title: "环境监测",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 3,
    defaultEnabled: true,
    subtitle: "核心环境要素",
    render: (container, data) => {
      const list = document.createElement("div");
      list.className = "module-content";

      const parameters = data.parameters ?? [];
      parameters.forEach((item) => {
        const card = document.createElement("div");
        card.className = "water-card";

        const title = document.createElement("h3");
        title.textContent = item.label;

        const value = document.createElement("p");
        value.textContent = item.value;

        const trend = document.createElement("span");
        trend.className = "kpi-trend";
        trend.textContent = item.trend;

        card.append(title, value, trend);
        list.appendChild(card);
      });

      container.appendChild(list);
    },
  },
  {
    id: "growth",
    title: "作物生长监测",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 4,
    defaultEnabled: true,
    subtitle: "长势指数与病虫害",
    render: (container, data) => {
      const content = document.createElement("div");
      content.className = "module-content";

      const vigor = document.createElement("div");
      vigor.className = "water-card";
      const vigorData = data.vigor ?? { score: "--", level: "normal", label: "暂无" };
      vigor.innerHTML = `
        <h3>长势指数</h3>
        <p>${vigorData.score}</p>
        <span class="badge ${vigorData.level}">${vigorData.label}</span>
      `;

      const alerts = document.createElement("div");
      alerts.className = "list";

      const pestAlerts = data.pests ?? [];
      pestAlerts.forEach((alert) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${alert.title}</span>
          <span class="badge ${alert.level}">${alert.levelLabel}</span>
        `;
        alerts.appendChild(row);
      });

      content.append(vigor, alerts);
      container.appendChild(content);
    },
  },
  {
    id: "farming",
    title: "农事活动面板",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 10,
    defaultEnabled: false,
    subtitle: "本日 / 本周任务",
    render: (container, data) => {
      const list = document.createElement("div");
      list.className = "module-content list";

      const tasks = data.tasks ?? [];
      tasks.forEach((task) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${task.title}</span>
          <span class="badge ${task.status}">${task.statusLabel}</span>
        `;
        list.appendChild(row);
      });

      container.appendChild(list);
    },
  },
  {
    id: "water",
    title: "灌溉与用水",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 5,
    defaultEnabled: true,
    subtitle: "今日用水 / 灌溉执行",
    render: (container, data) => {
      const grid = document.createElement("div");
      grid.className = "module-content water-usage";

      const cards = data.cards ?? [];
      cards.forEach((cardData) => {
        const card = document.createElement("div");
        card.className = "water-card";
        card.innerHTML = `
          <h3>${cardData.label}</h3>
          <p>${cardData.value}</p>
          <span class="kpi-trend">${cardData.trend}</span>
        `;
        grid.appendChild(card);
      });

      container.appendChild(grid);
    },
  },
  {
    id: "devices",
    title: "设备状态",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 6,
    defaultEnabled: true,
    subtitle: "分类统计与异常列表",
    render: (container, data) => {
      const content = document.createElement("div");
      content.className = "module-content";

      const summary = document.createElement("div");
      summary.className = "tag-list";
      const summaryItems = data.summary ?? [];
      summaryItems.forEach((item) => {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.textContent = `${item.label}: ${item.value}`;
        summary.appendChild(tag);
      });

      const list = document.createElement("div");
      list.className = "list";
      const anomalies = data.anomalies ?? [];
      anomalies.forEach((item) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${item.name}</span>
          <span class="badge ${item.level}">${item.status}</span>
        `;
        list.appendChild(row);
      });

      content.append(summary, list);
      container.appendChild(content);
    },
  },
  {
    id: "alerts",
    title: "告警与待办",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 7,
    defaultEnabled: true,
    subtitle: "最新告警 (按级别)",
    render: (container, data) => {
      const list = document.createElement("div");
      list.className = "module-content list";

      const alerts = data.items ?? [];
      alerts.forEach((item) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${item.title}</span>
          <span class="badge ${item.level}">${item.levelLabel}</span>
        `;
        list.appendChild(row);
      });

      container.appendChild(list);
    },
  },
  {
    id: "video",
    title: "视频监控窗口",
    spanClass: "grid-span-6",
    required: false,
    defaultOrder: 11,
    defaultEnabled: false,
    subtitle: "实时画面占位 (2~4 路)",
    render: (container, data) => {
      const grid = document.createElement("div");
      grid.className = "module-content map-grid";

      const streams = data.streams ?? [];
      streams.forEach((stream) => {
        const placeholder = document.createElement("div");
        placeholder.className = "plot-card";
        placeholder.innerHTML = `
          <div class="plot-header">
            <span>${stream.label}</span>
            <span class="badge normal">实时</span>
          </div>
          <div class="metric-pair">
            <span>占位画面</span>
            <span>${stream.status}</span>
          </div>
        `;
        grid.appendChild(placeholder);
      });

      container.appendChild(grid);
    },
  },
  {
    id: "forecast",
    title: "气象预报",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 12,
    defaultEnabled: false,
    subtitle: "未来 3 天趋势",
    render: (container, data) => {
      const list = document.createElement("div");
      list.className = "module-content list";

      const days = data.days ?? [];
      days.forEach((day) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${day.date}</span>
          <span>${day.weather}</span>
          <span>${day.temp}</span>
        `;
        list.appendChild(row);
      });

      container.appendChild(list);
    },
  },
  {
    id: "brand",
    title: "品牌展示",
    spanClass: "grid-span-3",
    required: false,
    defaultOrder: 13,
    defaultEnabled: false,
    subtitle: "Logo / 介绍",
    render: (container, data) => {
      const content = document.createElement("div");
      content.className = "module-content";

      const logo = document.createElement("div");
      logo.className = "water-card";
      const brandInfo = data.name
        ? data
        : {
            name: "品牌名称",
            description: "可展示农场简介、荣誉等信息。",
            tagline: "欢迎词 / 实时标语",
          };
      logo.innerHTML = `
        <h3>${brandInfo.name}</h3>
        <p style="font-size:1rem; line-height:1.6;">${brandInfo.description}</p>
        <span class="kpi-trend">${brandInfo.tagline}</span>
      `;

      content.appendChild(logo);
      container.appendChild(content);
    },
  },
  {
    id: "yield",
    title: "产量预估",
    spanClass: "grid-span-4",
    required: false,
    defaultOrder: 9,
    defaultEnabled: false,
    subtitle: "作物类型 / 地块",
    render: (container, data) => {
      const list = document.createElement("div");
      list.className = "module-content list";

      const items = data.items ?? [];
      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "list-item";
        row.innerHTML = `
          <span>${item.crop}</span>
          <span>${item.plot}</span>
          <span>${item.estimate ?? "—"}</span>
        `;
        list.appendChild(row);
      });

      container.appendChild(list);
    },
  },
];

const sampleData = {
  "top-kpi": {
    kpis: [
      { label: "作物面积 (亩)", value: "1,250", trend: "本周 +2.5%" },
      { label: "在线设备 (台)", value: "86", trend: "在线率 97%" },
      { label: "未处理告警", value: "5", trend: "严重 1 / 一般 4" },
      { label: "今日用水量 (m³)", value: "128", trend: "同比 -5%" },
    ],
  },
  "map-grid": {
    plots: [
      {
        name: "A1-玉米",
        status: "normal",
        statusLabel: "正常",
        metrics: [
          ["温度", "25.4℃"],
          ["湿度", "68%"],
          ["墒情", "良好"],
        ],
      },
      {
        name: "B2-草莓",
        status: "warning",
        statusLabel: "关注",
        metrics: [
          ["温度", "18.2℃"],
          ["湿度", "88%"],
          ["墒情", "偏湿"],
        ],
      },
      {
        name: "C1-蓝莓",
        status: "alert",
        statusLabel: "异常",
        metrics: [
          ["温度", "30.1℃"],
          ["湿度", "54%"],
          ["墒情", "偏干"],
        ],
      },
      {
        name: "D3-猕猴桃",
        status: "normal",
        statusLabel: "正常",
        metrics: [
          ["温度", "23.6℃"],
          ["湿度", "71%"],
          ["墒情", "适宜"],
        ],
      },
    ],
  },
  environment: {
    parameters: [
      { label: "气温", value: "24.6℃", trend: "较昨日 +0.8" },
      { label: "空气湿度", value: "72%", trend: "较昨日 +3%" },
      { label: "光照", value: "5.8 h", trend: "较昨日 +0.5" },
      { label: "降雨量", value: "2.4 mm", trend: "较昨日 -1.2" },
      { label: "土壤温度", value: "20.3℃", trend: "持平" },
      { label: "土壤湿度", value: "61%", trend: "适宜" },
      { label: "电导率", value: "1.8 ms/cm", trend: "正常范围" },
    ],
  },
  growth: {
    vigor: { score: "83", level: "normal", label: "正常" },
    pests: [
      { title: "A1 区-棉铃虫监测", level: "warning", levelLabel: "关注" },
      { title: "C1 区-白粉病风险", level: "alert", levelLabel: "严重" },
    ],
  },
  farming: {
    tasks: [
      { title: "A 区滴灌调试", status: "warning", statusLabel: "进行中" },
      { title: "B 区追肥作业", status: "normal", statusLabel: "已完成" },
      { title: "C 区病害复查", status: "alert", statusLabel: "待处理" },
    ],
  },
  water: {
    cards: [
      { label: "今日用水量", value: "128 m³", trend: "-5%" },
      { label: "灌溉执行次数", value: "6 次", trend: "+1" },
      { label: "灌溉设备在线率", value: "96%", trend: "在线 24/25" },
    ],
  },
  devices: {
    summary: [
      { label: "网关", value: "6" },
      { label: "传感器", value: "58" },
      { label: "泵阀", value: "12" },
      { label: "摄像头", value: "10" },
    ],
    anomalies: [
      { name: "泵阀-东南 2", status: "离线", level: "alert" },
      { name: "摄像头-仓储", status: "信号弱", level: "warning" },
      { name: "传感器-土壤 18", status: "电量低", level: "warning" },
    ],
  },
  alerts: {
    items: [
      { title: "C1 地块墒情偏低", level: "alert", levelLabel: "严重" },
      { title: "草莓病虫害关注", level: "warning", levelLabel: "关注" },
      { title: "北区摄像头信号弱", level: "warning", levelLabel: "关注" },
      { title: "新增作业待确认", level: "normal", levelLabel: "一般" },
    ],
  },
  video: {
    streams: [
      { label: "温室 1 号", status: "高清" },
      { label: "露地东北区", status: "高清" },
      { label: "仓储通道", status: "高清" },
    ],
  },
  forecast: {
    days: [
      { date: "周二", weather: "多云", temp: "18-26℃" },
      { date: "周三", weather: "小雨", temp: "17-23℃" },
      { date: "周四", weather: "晴", temp: "19-28℃" },
    ],
  },
  brand: {
    name: "星禾智慧农场",
    description: "聚焦设施农业，覆盖 1,200 亩标准化种植基地，实现精准灌溉与全生命周期管理。",
    tagline: "欢迎来到星禾智慧农场 · 实时掌握作物状态",
  },
  yield: {
    items: [
      { crop: "玉米", plot: "A1", estimate: "45 吨" },
      { crop: "草莓", plot: "B2", estimate: "12 吨" },
      { crop: "蓝莓", plot: "C1", estimate: "—" },
    ],
  },
};

const defaultModuleConfig = moduleDefinitions.map((definition, index) => ({
  id: definition.id,
  order: definition.defaultOrder ?? index + 1,
  enabled: definition.required ? true : definition.defaultEnabled,
}));

const backendConfig = window.dashboardConfig || {
  modules: defaultModuleConfig,
};

function renderDashboard(config) {
  const container = document.getElementById("app");
  if (!container) return;

  container.innerHTML = "";

  const modules = moduleDefinitions.map((definition) => {
    const configItem = config.modules.find((item) => item.id === definition.id);
    const order = configItem?.order ?? definition.defaultOrder;
    const enabled = definition.required
      ? true
      : configItem?.enabled ?? definition.defaultEnabled;

    return {
      ...definition,
      order,
      enabled,
    };
  });

  modules
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order)
    .forEach((module) => {
      const section = document.createElement("section");
      section.className = `module ${module.spanClass}`;

      const title = document.createElement("h2");
      title.innerHTML = `
        <span>${module.title}</span>
        <span>${module.subtitle ?? ""}</span>
      `;

      section.appendChild(title);
      const moduleData = sampleData[module.id] ?? {};
      module.render(section, moduleData);
      container.appendChild(section);
    });
}

renderDashboard(backendConfig);

window.AgriDash = {
  render: renderDashboard,
  definitions: moduleDefinitions,
  data: sampleData,
  defaultConfig: defaultModuleConfig,
};
