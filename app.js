const moduleDefinitions = [
  {
    id: "kpiOverview",
    title: "顶部总览 KPI",
    subtitle: "今日 / 本周数据",
    required: true,
    defaultOrder: 1,
    dataKey: "kpi",
    renderer: renderKpiOverview,
  },
  {
    id: "mapOverview",
    title: "农田分区格网",
    subtitle: "区块状态",
    required: true,
    defaultOrder: 2,
    dataKey: "farmland",
    renderer: renderMapOverview,
  },
  {
    id: "environment",
    title: "环境监测",
    subtitle: "实时传感器",
    defaultEnabled: true,
    defaultOrder: 3,
    dataKey: "environment",
    renderer: renderEnvironment,
  },
  {
    id: "cropMonitoring",
    title: "作物生长监测",
    subtitle: "长势 & 病虫害",
    defaultEnabled: true,
    defaultOrder: 4,
    dataKey: "crop",
    renderer: renderCropMonitoring,
  },
  {
    id: "irrigation",
    title: "灌溉与用水",
    subtitle: "今日执行",
    defaultEnabled: true,
    defaultOrder: 5,
    dataKey: "irrigation",
    renderer: renderIrrigation,
  },
  {
    id: "deviceStatus",
    title: "设备状态",
    subtitle: "在线 / 异常统计",
    defaultEnabled: true,
    defaultOrder: 6,
    dataKey: "devices",
    renderer: renderDevices,
  },
  {
    id: "alerts",
    title: "告警与待办",
    subtitle: "按级别排序",
    defaultEnabled: true,
    defaultOrder: 7,
    dataKey: "alerts",
    renderer: renderAlerts,
  },
  {
    id: "farmingTasks",
    title: "农事活动面板",
    subtitle: "今日 / 本周任务",
    defaultEnabled: false,
    defaultOrder: 8,
    dataKey: "tasks",
    renderer: renderTasks,
  },
  {
    id: "videoFeeds",
    title: "视频监控窗口",
    subtitle: "实时画面",
    defaultEnabled: false,
    defaultOrder: 9,
    dataKey: "videos",
    renderer: renderVideos,
  },
  {
    id: "yieldForecast",
    title: "产量预估",
    subtitle: "按作物 / 地块",
    defaultEnabled: false,
    defaultOrder: 10,
    dataKey: "yield",
    renderer: renderYield,
  },
  {
    id: "weather",
    title: "气象预报",
    subtitle: "未来 3 天",
    defaultEnabled: false,
    defaultOrder: 11,
    dataKey: "weather",
    renderer: renderWeather,
  },
  {
    id: "branding",
    title: "品牌展示",
    subtitle: "宣传区",
    defaultEnabled: false,
    defaultOrder: 12,
    dataKey: "branding",
    renderer: renderBranding,
  },
];

// 模拟后台下发的模块配置：required 模块不可关闭，但顺序可调整
const backendModuleConfig = {
  kpiOverview: { order: 1 },
  mapOverview: { order: 2 },
  environment: { enabled: true, order: 3 },
  cropMonitoring: { enabled: true, order: 4 },
  irrigation: { enabled: true, order: 5 },
  deviceStatus: { enabled: true, order: 6 },
  alerts: { enabled: true, order: 7 },
  farmingTasks: { enabled: false, order: 9 },
  videoFeeds: { enabled: false, order: 10 },
  yieldForecast: { enabled: false, order: 11 },
  weather: { enabled: false, order: 12 },
  branding: { enabled: false, order: 13 },
};

const dashboardData = {
  kpi: {
    todayArea: "520 亩",
    deviceOnline: 128,
    pendingAlerts: 6,
    waterUsage: "34.6 m³",
  },
  farmland: [
    {
      id: "A1",
      crop: "番茄",
      status: "normal",
      temperature: 24.6,
      humidity: 68,
      soilMoisture: 32,
    },
    {
      id: "A2",
      crop: "草莓",
      status: "watch",
      temperature: 23.8,
      humidity: 71,
      soilMoisture: 28,
    },
    {
      id: "B1",
      crop: "生菜",
      status: "alert",
      temperature: 20.2,
      humidity: 82,
      soilMoisture: 18,
    },
    {
      id: "B2",
      crop: "甜椒",
      status: "normal",
      temperature: 25.4,
      humidity: 65,
      soilMoisture: 30,
    },
    {
      id: "C1",
      crop: "蓝莓",
      status: "normal",
      temperature: 22.1,
      humidity: 75,
      soilMoisture: 35,
    },
    {
      id: "C2",
      crop: "葡萄",
      status: "watch",
      temperature: 26.4,
      humidity: 61,
      soilMoisture: 29,
    },
  ],
  environment: [
    { label: "气温", value: "25.3℃" },
    { label: "空气湿度", value: "68%" },
    { label: "光照", value: "5.2 klux" },
    { label: "降雨量", value: "2.4 mm" },
    { label: "土壤温度", value: "21.7℃" },
    { label: "土壤湿度", value: "31%" },
    { label: "电导率", value: "1.4 mS/cm" },
  ],
  crop: {
    growthIndex: "偏弱",
    status: "weak",
    highlights: [
      "番茄 1 区叶面黄化趋势",
      "草莓区检测到小灰蝶幼虫",
    ],
  },
  irrigation: {
    todayWater: "34.6 m³",
    executions: 5,
    deviceOnlineRate: "92%",
  },
  devices: {
    summary: [
      { category: "网关", total: 8, abnormal: 0 },
      { category: "传感器", total: 96, abnormal: 3 },
      { category: "泵阀", total: 12, abnormal: 1 },
      { category: "摄像头", total: 18, abnormal: 2 },
    ],
    offline: [
      { name: "土壤温度传感器-#A21", duration: "离线 45 分钟" },
      { name: "虫情灯-#S04", duration: "离线 28 分钟" },
      { name: "喷灌阀门-#V12", duration: "离线 12 分钟" },
    ],
  },
  alerts: [
    { title: "番茄区病虫害预警", level: "high", time: "09:20" },
    { title: "B1 地块墒情偏低", level: "medium", time: "08:55" },
    { title: "摄像头 #C08 离线", level: "medium", time: "08:10" },
    { title: "灌溉泵 #P03 维护提醒", level: "low", time: "07:40" },
  ],
  tasks: [
    { title: "B2 地块追肥", status: "进行中" },
    { title: "温室西区滴灌测试", status: "待执行" },
    { title: "草莓采收", status: "已完成" },
  ],
  videos: [
    { title: "温室 1 区" },
    { title: "育苗棚" },
    { title: "加工车间" },
  ],
  yield: [
    { crop: "番茄", area: "A1", forecast: "23.4 吨" },
    { crop: "草莓", area: "A2", forecast: "18.1 吨" },
    { crop: "蓝莓", area: "C1", forecast: "—" },
  ],
  weather: [
    { day: "今天", temperature: "27/19℃", humidity: "70%", rain: "小雨", wind: "东北风 3 级" },
    { day: "明天", temperature: "26/18℃", humidity: "68%", rain: "多云", wind: "西南风 2 级" },
    { day: "后天", temperature: "28/20℃", humidity: "72%", rain: "阵雨", wind: "东风 3 级" },
  ],
  branding: {
    logo: "AgriDash 智慧农场",
    intro: "打造标准化、可视化的现代农业数字化管理平台。",
    slogan: "欢迎来到智慧种植示范基地",
  },
};

function resolveModuleConfig(definition) {
  const config = backendModuleConfig[definition.id] || {};
  const enabled = definition.required
    ? true
    : config.enabled !== undefined
    ? config.enabled
    : definition.defaultEnabled !== undefined
    ? definition.defaultEnabled
    : true;

  const order = config.order ?? definition.defaultOrder ?? 999;
  return { ...definition, enabled, order };
}

function getSortedModules() {
  return moduleDefinitions
    .map(resolveModuleConfig)
    .filter((module) => module.required || module.enabled)
    .sort((a, b) => {
      if (a.required && !b.required) return -1;
      if (!a.required && b.required) return 1;
      return a.order - b.order;
    });
}

function renderDashboard() {
  const dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "";

  const modules = getSortedModules();
  modules.forEach((module) => {
    const section = document.createElement("section");
    section.className = "module";
    section.dataset.moduleId = module.id;

    const header = document.createElement("h2");
    header.textContent = module.title;
    if (module.subtitle) {
      const span = document.createElement("span");
      span.textContent = module.subtitle;
      header.appendChild(span);
    }
    section.appendChild(header);

    const renderer = module.renderer;
    const fragment = renderer ? renderer(dashboardData[module.dataKey]) : null;
    if (fragment) {
      section.appendChild(fragment);
    }

    dashboard.appendChild(section);
  });
}

function renderKpiOverview(data) {
  const wrapper = document.createElement("div");
  wrapper.className = "kpi-grid";

  const kpis = [
    { label: "今日作物面积", value: data.todayArea },
    { label: "在线设备数", value: data.deviceOnline },
    { label: "未处理告警数", value: data.pendingAlerts },
    { label: "今日用水量", value: data.waterUsage },
  ];

  kpis.forEach((item) => {
    const card = document.createElement("div");
    card.className = "kpi-card";

    const value = document.createElement("div");
    value.className = "kpi-value";
    value.textContent = item.value;
    const label = document.createElement("div");
    label.className = "kpi-label";
    label.textContent = item.label;

    card.appendChild(value);
    card.appendChild(label);
    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderMapOverview(blocks) {
  const wrapper = document.createElement("div");
  wrapper.className = "map-grid";

  blocks.forEach((block) => {
    const cell = document.createElement("div");
    cell.className = `map-cell ${block.status}`;

    const title = document.createElement("h3");
    title.textContent = `${block.id} · ${block.crop}`;

    const chip = document.createElement("div");
    chip.className = `status-chip ${block.status === "alert" ? "danger" : block.status === "watch" ? "weak" : "normal"}`;
    chip.textContent =
      block.status === "alert"
        ? "异常"
        : block.status === "watch"
        ? "关注"
        : "正常";

    const metrics = document.createElement("div");
    metrics.className = "metrics";
    metrics.innerHTML = `
      <span>气温：${block.temperature.toFixed(1)}℃</span>
      <span>湿度：${block.humidity}%</span>
      <span>墒情：${block.soilMoisture}%</span>
    `;

    cell.appendChild(title);
    cell.appendChild(chip);
    cell.appendChild(metrics);
    wrapper.appendChild(cell);
  });

  return wrapper;
}

function renderEnvironment(metrics) {
  const wrapper = document.createElement("div");
  wrapper.className = "metric-grid";

  metrics.forEach((metric) => {
    const card = document.createElement("div");
    card.className = "metric-card";

    const label = document.createElement("span");
    label.textContent = metric.label;
    const value = document.createElement("strong");
    value.textContent = metric.value;

    card.appendChild(value);
    card.appendChild(label);
    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderCropMonitoring(data) {
  const wrapper = document.createElement("div");
  wrapper.className = "metric-grid";

  const statusCard = document.createElement("div");
  statusCard.className = "metric-card";
  const label = document.createElement("small");
  label.textContent = "长势指数";
  const chip = document.createElement("div");
  chip.className = `status-chip ${data.status}`;
  chip.textContent = data.growthIndex;
  statusCard.appendChild(label);
  statusCard.appendChild(chip);
  wrapper.appendChild(statusCard);

  const highlightsCard = document.createElement("div");
  highlightsCard.className = "metric-card";
  const title = document.createElement("small");
  title.textContent = "病虫害告警";
  const list = document.createElement("ul");
  list.className = "list";
  data.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  highlightsCard.appendChild(title);
  highlightsCard.appendChild(list);

  wrapper.appendChild(highlightsCard);

  return wrapper;
}

function renderIrrigation(data) {
  const wrapper = document.createElement("div");
  wrapper.className = "metric-grid";

  const metrics = [
    { label: "今日用水量", value: data.todayWater },
    { label: "灌溉执行次数", value: data.executions },
    { label: "设备在线率", value: data.deviceOnlineRate },
  ];

  metrics.forEach((metric) => {
    const card = document.createElement("div");
    card.className = "metric-card";
    const strong = document.createElement("strong");
    strong.textContent = metric.value;
    const span = document.createElement("span");
    span.textContent = metric.label;
    card.appendChild(strong);
    card.appendChild(span);
    wrapper.appendChild(card);
  });

  return wrapper;
}

function renderDevices(data) {
  const wrapper = document.createElement("div");
  wrapper.className = "metric-grid";

  const summaryCard = document.createElement("div");
  summaryCard.className = "metric-card";
  const summaryTitle = document.createElement("small");
  summaryTitle.textContent = "分类统计";
  summaryCard.appendChild(summaryTitle);
  const list = document.createElement("ul");
  list.className = "list";
  data.summary.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <span>${item.category}</span>
      <span>${item.abnormal}/${item.total}</span>
    `;
    list.appendChild(li);
  });
  summaryCard.appendChild(list);

  const offlineCard = document.createElement("div");
  offlineCard.className = "metric-card";
  const offlineTitle = document.createElement("small");
  offlineTitle.textContent = "异常 / 离线设备";
  offlineCard.appendChild(offlineTitle);
  const offlineList = document.createElement("ul");
  offlineList.className = "list";
  data.offline.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <span>${item.name}</span>
      <span>${item.duration}</span>
    `;
    offlineList.appendChild(li);
  });
  offlineCard.appendChild(offlineList);

  wrapper.appendChild(summaryCard);
  wrapper.appendChild(offlineCard);

  return wrapper;
}

function renderAlerts(alerts) {
  const wrapper = document.createElement("ul");
  wrapper.className = "list alert-list";

  alerts.forEach((alert) => {
    const li = document.createElement("li");
    li.className = "list-item";

    const title = document.createElement("span");
    title.textContent = alert.title;

    const meta = document.createElement("span");
    meta.innerHTML = `<span class="alert-level ${alert.level}">${alert.level.toUpperCase()}</span> · ${alert.time}`;

    li.appendChild(title);
    li.appendChild(meta);
    wrapper.appendChild(li);
  });

  return wrapper;
}

function renderTasks(tasks) {
  const wrapper = document.createElement("ul");
  wrapper.className = "list";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <span>${task.title}</span>
      <span>${task.status}</span>
    `;
    wrapper.appendChild(li);
  });

  return wrapper;
}

function renderVideos(feeds) {
  const wrapper = document.createElement("div");
  wrapper.className = "video-grid";

  feeds.slice(0, 4).forEach((feed) => {
    const video = document.createElement("div");
    video.className = "video-feed";
    video.textContent = `${feed.title} · 实时预览`;
    wrapper.appendChild(video);
  });

  return wrapper;
}

function renderYield(items) {
  const wrapper = document.createElement("ul");
  wrapper.className = "list";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <span>${item.crop}（${item.area}）</span>
      <span>${item.forecast}</span>
    `;
    wrapper.appendChild(li);
  });

  return wrapper;
}

function renderWeather(days) {
  const wrapper = document.createElement("ul");
  wrapper.className = "list";

  days.forEach((day) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <span>${day.day}</span>
      <span>${day.temperature} · ${day.rain} · ${day.wind}</span>
    `;
    wrapper.appendChild(li);
  });

  return wrapper;
}

function renderBranding(info) {
  const wrapper = document.createElement("div");
  wrapper.className = "branding";

  const logo = document.createElement("div");
  logo.className = "logo";
  logo.textContent = info.logo;

  const intro = document.createElement("div");
  intro.className = "tagline";
  intro.textContent = info.intro;

  const slogan = document.createElement("div");
  slogan.className = "badge";
  slogan.textContent = info.slogan;

  wrapper.appendChild(logo);
  wrapper.appendChild(intro);
  wrapper.appendChild(slogan);

  return wrapper;
}

renderDashboard();
