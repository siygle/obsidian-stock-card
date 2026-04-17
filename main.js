/* eslint-disable */
this.require = require;
this.module = module;
this.exports = exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => StockInfoCardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  apiBaseUrl: "http://localhost:8787",
  searchPath: "/search?q={query}",
  detailPathTemplate: "/stocks/{id}",
  apiKey: "",
  apiKeyHeaderName: "x-api-key",
  maxNewsCount: 3,
  autoCompleteTrigger: "@stock ",
  demoMode: true
};
var DEMO_STOCKS = [
  {
    id: "2330",
    symbol: "2330",
    name: "\u53F0\u7A4D\u96FB",
    market: "TWSE",
    exchange: "\u4E0A\u5E02",
    sector: "\u534A\u5C0E\u9AD4",
    businessSummary: "\u5168\u7403\u6676\u5713\u4EE3\u5DE5\u9F8D\u982D\uFF0C\u63D0\u4F9B\u5148\u9032\u88FD\u7A0B\u3001\u6210\u719F\u88FD\u7A0B\u8207\u5148\u9032\u5C01\u88DD\u670D\u52D9\uFF0C\u53D7\u60E0 AI\u3001HPC \u8207\u624B\u6A5F\u6676\u7247\u9700\u6C42\u3002",
    website: "https://www.tsmc.com",
    price: {
      current: 950,
      changePctDay: 1.2,
      changePctWeek: 4.8,
      changePctMonth: 12.3,
      currency: "TWD",
      asOf: "2026-04-16"
    },
    news: [
      {
        title: "\u53F0\u7A4D\u96FB\u6CD5\u8AAA\u512A\u65BC\u9810\u671F\uFF0C\u5E02\u5834\u95DC\u6CE8\u5148\u9032\u5C01\u88DD\u64F4\u7522",
        url: "https://example.com/news/tsmc-earnings",
        source: "\u793A\u610F\u65B0\u805E",
        publishedAt: "2026-04-16"
      },
      {
        title: "CoPoS \u8207 CoWoS \u9032\u5EA6\u66F4\u65B0\uFF0CAI \u9700\u6C42\u6301\u7E8C\u5F37\u52C1",
        url: "https://example.com/news/tsmc-copos",
        source: "\u793A\u610F\u65B0\u805E",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "\u5B98\u65B9\u7DB2\u7AD9", url: "https://www.tsmc.com" },
      { label: "Yahoo \u80A1\u5E02", url: "https://tw.stock.yahoo.com/quote/2330" }
    ]
  },
  {
    id: "2303",
    symbol: "2303",
    name: "\u806F\u96FB",
    market: "TWSE",
    exchange: "\u4E0A\u5E02",
    sector: "\u534A\u5C0E\u9AD4",
    businessSummary: "\u5168\u7403\u6210\u719F\u88FD\u7A0B\u6676\u5713\u4EE3\u5DE5\u91CD\u8981\u696D\u8005\uFF0C\u805A\u7126\u7279\u6B8A\u88FD\u7A0B\u8207\u7A69\u5065\u73FE\u91D1\u6D41\u3002",
    website: "https://www.umc.com",
    price: {
      current: 68.3,
      changePctDay: 9.98,
      changePctWeek: 13.4,
      changePctMonth: 16.2,
      currency: "TWD",
      asOf: "2026-04-16"
    },
    news: [
      {
        title: "\u806F\u96FB\u653E\u91CF\u6F32\u505C\uFF0C\u5E02\u5834\u805A\u7126\u6210\u719F\u88FD\u7A0B\u9700\u6C42\u5FA9\u7526",
        url: "https://example.com/news/umc-rally",
        source: "\u793A\u610F\u65B0\u805E",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "\u5B98\u65B9\u7DB2\u7AD9", url: "https://www.umc.com" },
      { label: "Yahoo \u80A1\u5E02", url: "https://tw.stock.yahoo.com/quote/2303" }
    ]
  },
  {
    id: "2454",
    symbol: "2454",
    name: "\u806F\u767C\u79D1",
    market: "TWSE",
    exchange: "\u4E0A\u5E02",
    sector: "IC \u8A2D\u8A08",
    businessSummary: "\u53F0\u7063 IC \u8A2D\u8A08\u9F8D\u982D\uFF0C\u7522\u54C1\u6DB5\u84CB\u624B\u6A5F SoC\u3001Wi-Fi\u3001\u8ECA\u7528\u8207 AI \u904B\u7B97\u5E73\u53F0\u3002",
    website: "https://www.mediatek.com",
    price: {
      current: 1895,
      changePctDay: 5.87,
      changePctWeek: 8.9,
      changePctMonth: 14.6,
      currency: "TWD",
      asOf: "2026-04-16"
    },
    news: [
      {
        title: "\u806F\u767C\u79D1\u53D7\u60E0 AI \u8207\u65D7\u8266\u624B\u6A5F\u6676\u7247\u51FA\u8CA8\u52D5\u80FD",
        url: "https://example.com/news/mediatek-ai",
        source: "\u793A\u610F\u65B0\u805E",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "\u5B98\u65B9\u7DB2\u7AD9", url: "https://www.mediatek.com" },
      { label: "Yahoo \u80A1\u5E02", url: "https://tw.stock.yahoo.com/quote/2454" }
    ]
  }
];
var StockInfoCardPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.stockService = new StockDataService(this.settings);
    this.addCommand({
      id: "search-stock-and-insert-card",
      name: "Search stock and insert card",
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (!view) return false;
        if (!checking) {
          new StockSearchModal(this.app, this.stockService, async (item) => {
            await this.insertCardFromSearchItem(item, view.editor);
          }).open();
        }
        return true;
      }
    });
    this.registerEditorSuggest(new StockEditorSuggest(this.app, this.stockService, this.settings, this));
    this.addSettingTab(new StockInfoCardSettingTab(this.app, this));
  }
  async reloadService() {
    this.stockService = new StockDataService(this.settings);
  }
  async insertCardFromSearchItem(item, editor) {
    try {
      const detail = await this.stockService.getStockDetail(item.id, this.settings.maxNewsCount);
      const markdown = renderStockCard(detail, this.settings.maxNewsCount);
      insertAtCursor(editor, markdown);
      new import_obsidian.Notice(`\u5DF2\u63D2\u5165 ${detail.symbol} ${detail.name} \u8CC7\u8A0A\u5361`);
    } catch (error) {
      console.error(error);
      new import_obsidian.Notice(`\u63D2\u5165\u80A1\u7968\u5361\u5931\u6557\uFF1A${getErrorMessage(error)}`);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    await this.reloadService();
  }
};
var StockDataService = class {
  constructor(settings) {
    this.settings = settings;
  }
  async searchStocks(query) {
    const trimmed = query.trim();
    if (!trimmed) return [];
    if (this.settings.demoMode) {
      return this.searchDemo(trimmed);
    }
    const url = joinUrl(
      this.settings.apiBaseUrl,
      this.settings.searchPath.replace("{query}", encodeURIComponent(trimmed))
    );
    const response = await (0, import_obsidian.requestUrl)({
      url,
      method: "GET",
      headers: this.buildHeaders()
    });
    const json = response.json;
    if (Array.isArray(json)) {
      return json;
    }
    if (Array.isArray(json == null ? void 0 : json.items)) {
      return json.items;
    }
    throw new Error("\u641C\u5C0B API \u56DE\u50B3\u683C\u5F0F\u4E0D\u6B63\u78BA");
  }
  async getStockDetail(id, maxNewsCount) {
    if (this.settings.demoMode) {
      const found = DEMO_STOCKS.find((item) => item.id === id || item.symbol === id);
      if (!found) throw new Error(`\u627E\u4E0D\u5230\u80A1\u7968\uFF1A${id}`);
      return {
        ...found,
        news: (found.news || []).slice(0, maxNewsCount)
      };
    }
    const url = joinUrl(
      this.settings.apiBaseUrl,
      this.settings.detailPathTemplate.replace("{id}", encodeURIComponent(id))
    );
    const response = await (0, import_obsidian.requestUrl)({
      url,
      method: "GET",
      headers: this.buildHeaders()
    });
    const detail = response.json;
    if (!(detail == null ? void 0 : detail.symbol) || !(detail == null ? void 0 : detail.name)) {
      throw new Error("\u80A1\u7968\u8A73\u60C5 API \u56DE\u50B3\u683C\u5F0F\u4E0D\u6B63\u78BA");
    }
    return {
      ...detail,
      news: (detail.news || []).slice(0, maxNewsCount)
    };
  }
  searchDemo(query) {
    const lower = query.toLowerCase();
    return DEMO_STOCKS.filter((stock) => {
      return [stock.id, stock.symbol, stock.name, stock.sector, stock.businessSummary].filter(Boolean).some((value) => String(value).toLowerCase().includes(lower));
    }).map((stock) => ({
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      market: stock.market,
      exchange: stock.exchange
    }));
  }
  buildHeaders() {
    const apiKey = this.settings.apiKey.trim();
    if (!apiKey) return void 0;
    const headerName = this.settings.apiKeyHeaderName.trim() || DEFAULT_SETTINGS.apiKeyHeaderName;
    return {
      [headerName]: apiKey
    };
  }
};
var StockSearchModal = class extends import_obsidian.SuggestModal {
  constructor(app, stockService, onChoose) {
    super(app);
    this.stockService = stockService;
    this.onChoose = onChoose;
    this.setPlaceholder("\u8F38\u5165\u80A1\u7968\u4EE3\u865F\u3001\u516C\u53F8\u540D\u7A31\u6216\u95DC\u9375\u5B57");
    this.emptyStateText = "\u627E\u4E0D\u5230\u7B26\u5408\u7684\u80A1\u7968";
  }
  async getSuggestions(query) {
    return this.stockService.searchStocks(query);
  }
  renderSuggestion(item, el) {
    el.addClass("stock-card-suggestion");
    el.createDiv({ text: `${item.symbol} ${item.name}`, cls: "stock-card-suggestion-title" });
    el.createDiv({
      text: [item.exchange, item.market].filter(Boolean).join(" \u2022 "),
      cls: "stock-card-suggestion-meta"
    });
  }
  async onChooseSuggestion(item) {
    await this.onChoose(item);
  }
};
var StockEditorSuggest = class extends import_obsidian.EditorSuggest {
  constructor(app, stockService, settings, plugin) {
    super(app);
    this.stockService = stockService;
    this.settings = settings;
    this.plugin = plugin;
  }
  onTrigger(cursor, editor, _file) {
    const line = editor.getLine(cursor.line);
    const before = line.slice(0, cursor.ch);
    const trigger = this.settings.autoCompleteTrigger;
    const start = before.lastIndexOf(trigger);
    if (start === -1) return null;
    const query = before.slice(start + trigger.length);
    if (query.includes("\n")) return null;
    return {
      start: { line: cursor.line, ch: start },
      end: cursor,
      query
    };
  }
  async getSuggestions(context) {
    return this.stockService.searchStocks(context.query);
  }
  renderSuggestion(item, el) {
    el.addClass("stock-card-suggestion");
    el.createDiv({ text: `${item.symbol} ${item.name}`, cls: "stock-card-suggestion-title" });
    el.createDiv({
      text: [item.exchange, item.market].filter(Boolean).join(" \u2022 "),
      cls: "stock-card-suggestion-meta"
    });
  }
  async selectSuggestion(item, evt) {
    var _a;
    const editor = (_a = this.context) == null ? void 0 : _a.editor;
    if (!editor || !this.context) return;
    evt.preventDefault();
    editor.replaceRange("", this.context.start, this.context.end);
    await this.plugin.insertCardFromSearchItem(item, editor);
    this.close();
  }
};
var StockInfoCardSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Stock Info Card \u8A2D\u5B9A" });
    new import_obsidian.Setting(containerEl).setName("Demo mode").setDesc("\u4F7F\u7528\u5167\u5EFA\u793A\u7BC4\u8CC7\u6599\u3002\u958B\u767C\u521D\u671F\u5EFA\u8B70\u958B\u555F\uFF0C\u63A5\u4E0A\u6B63\u5F0F API \u5F8C\u53EF\u95DC\u9589\u3002").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.demoMode).onChange(async (value) => {
        this.plugin.settings.demoMode = value;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    new import_obsidian.Setting(containerEl).setName("API base URL").setDesc("\u4F8B\u5982\uFF1Ahttp://localhost:8787").addText(
      (text) => text.setPlaceholder("http://localhost:8787").setValue(this.plugin.settings.apiBaseUrl).onChange(async (value) => {
        this.plugin.settings.apiBaseUrl = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Search path").setDesc("\u652F\u63F4 {query} \u8B8A\u6578\uFF0C\u4F8B\u5982\uFF1A/search?q={query}").addText(
      (text) => text.setValue(this.plugin.settings.searchPath).onChange(async (value) => {
        this.plugin.settings.searchPath = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Detail path template").setDesc("\u652F\u63F4 {id} \u8B8A\u6578\uFF0C\u4F8B\u5982\uFF1A/stocks/{id}").addText(
      (text) => text.setValue(this.plugin.settings.detailPathTemplate).onChange(async (value) => {
        this.plugin.settings.detailPathTemplate = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("API key").setDesc("\u9078\u586B\u3002\u82E5 API \u9700\u8981\u9A57\u8B49\uFF0C\u6703\u5728\u6BCF\u6B21\u8ACB\u6C42\u81EA\u52D5\u5E36\u4E0A\u6307\u5B9A header\u3002").addText(
      (text) => text.setPlaceholder("sk-...").setValue(this.plugin.settings.apiKey).onChange(async (value) => {
        this.plugin.settings.apiKey = value.trim();
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("API key header name").setDesc("\u9078\u586B\u3002\u9810\u8A2D\u70BA x-api-key\uFF0C\u4E5F\u53EF\u6539\u6210 Authorization \u7B49\u81EA\u8A02 header \u540D\u7A31\u3002").addText(
      (text) => text.setPlaceholder("x-api-key").setValue(this.plugin.settings.apiKeyHeaderName).onChange(async (value) => {
        this.plugin.settings.apiKeyHeaderName = value.trim() || DEFAULT_SETTINGS.apiKeyHeaderName;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Max news count").setDesc("\u63D2\u5165\u8CC7\u8A0A\u5361\u6642\u6700\u591A\u4FDD\u7559\u5E7E\u5247\u65B0\u805E").addText(
      (text) => text.setPlaceholder("3").setValue(String(this.plugin.settings.maxNewsCount)).onChange(async (value) => {
        const parsed = Number(value);
        this.plugin.settings.maxNewsCount = Number.isFinite(parsed) && parsed > 0 ? parsed : 3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Autocomplete trigger").setDesc("\u5728\u7DE8\u8F2F\u5668\u8F38\u5165\u6B64\u89F8\u767C\u5B57\u4E32\u5F8C\u6703\u958B\u59CB\u641C\u5C0B\uFF0C\u4F8B\u5982\uFF1A@stock ").addText(
      (text) => text.setValue(this.plugin.settings.autoCompleteTrigger).onChange(async (value) => {
        this.plugin.settings.autoCompleteTrigger = value || "@stock ";
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: "API \u56DE\u50B3\u683C\u5F0F" });
    containerEl.createEl("p", {
      text: "Search API \u53EF\u56DE\u50B3\u9663\u5217\u6216 { items: [...] }\uFF1BDetail API \u9700\u56DE\u50B3 symbol\u3001name\u3001price\u3001news\u3001references \u7B49\u6B04\u4F4D\u3002\u82E5\u6709\u586B API key\uFF0C\u8ACB\u6C42\u4E5F\u6703\u81EA\u52D5\u9644\u5E36\u4F60\u8A2D\u5B9A\u7684 header\u3002"
    });
  }
};
function renderStockCard(detail, maxNewsCount) {
  const header = `> [!info] ${detail.symbol} ${detail.name}`;
  const lines = [header];
  lines.push(`> **\u5E02\u5834**\uFF1A${[detail.exchange, detail.market].filter(Boolean).join(" / ") || "N/A"}  `);
  lines.push(`> **\u7522\u696D**\uFF1A${detail.sector || "N/A"}  `);
  if (detail.businessSummary) {
    lines.push(`> **\u696D\u52D9**\uFF1A${detail.businessSummary}  `);
  }
  if (detail.price) {
    lines.push(`> **\u8FD1\u671F\u50F9\u683C**\uFF1A  `);
    lines.push(`> - \u73FE\u50F9\uFF1A${formatPrice(detail.price)}  `);
    lines.push(`> - \u65E5\uFF1A${formatPercent(detail.price.changePctDay)}  `);
    lines.push(`> - \u9031\uFF1A${formatPercent(detail.price.changePctWeek)}  `);
    lines.push(`> - \u6708\uFF1A${formatPercent(detail.price.changePctMonth)}  `);
    if (detail.price.asOf) {
      lines.push(`> - \u66F4\u65B0\u6642\u9593\uFF1A${detail.price.asOf}  `);
    }
  }
  const news = (detail.news || []).slice(0, maxNewsCount);
  if (news.length > 0) {
    lines.push(`> **\u6700\u8FD1\u65B0\u805E**\uFF1A  `);
    for (const item of news) {
      const meta = [item.source, item.publishedAt].filter(Boolean).join(" \u2022 ");
      lines.push(`> - [${item.title}](${item.url})${meta ? `\uFF08${meta}\uFF09` : ""}  `);
    }
  }
  const references = [...detail.references || []];
  if (detail.website) {
    references.unshift({ label: "\u516C\u53F8\u5B98\u7DB2", url: detail.website });
  }
  if (references.length > 0) {
    lines.push(`> **\u66F4\u591A\u8CC7\u6599**\uFF1A  `);
    for (const link of dedupeReferences(references)) {
      lines.push(`> - [${link.label}](${link.url})  `);
    }
  }
  return `${lines.join("\n")}

`;
}
function insertAtCursor(editor, markdown) {
  const cursor = editor.getCursor();
  const prefix = cursor.ch === 0 ? "" : "\n\n";
  editor.replaceRange(prefix + markdown, cursor);
}
function formatPrice(price) {
  const currency = price.currency ? ` ${price.currency}` : "";
  return `${price.current}${currency}`;
}
function formatPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
function joinUrl(base, path) {
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function dedupeReferences(links) {
  const seen = /* @__PURE__ */ new Set();
  return links.filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}
