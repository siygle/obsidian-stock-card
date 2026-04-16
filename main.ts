import {
  App,
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  MarkdownView,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  SuggestModal,
  TFile,
  requestUrl
} from "obsidian";

interface StockSearchItem {
  id: string;
  symbol: string;
  name: string;
  market?: string;
  exchange?: string;
  keywords?: string[];
}

interface StockPriceSnapshot {
  current: number;
  changePctDay: number;
  changePctWeek: number;
  changePctMonth: number;
  currency?: string;
  asOf?: string;
}

interface StockNewsItem {
  title: string;
  url: string;
  source?: string;
  publishedAt?: string;
  summary?: string;
}

interface StockReferenceLink {
  label: string;
  url: string;
}

interface StockDetail {
  id: string;
  symbol: string;
  name: string;
  market?: string;
  exchange?: string;
  sector?: string;
  businessSummary?: string;
  website?: string;
  price?: StockPriceSnapshot;
  news?: StockNewsItem[];
  references?: StockReferenceLink[];
}

interface StockCardPluginSettings {
  apiBaseUrl: string;
  searchPath: string;
  detailPathTemplate: string;
  maxNewsCount: number;
  autoCompleteTrigger: string;
  demoMode: boolean;
}

const DEFAULT_SETTINGS: StockCardPluginSettings = {
  apiBaseUrl: "http://localhost:8787",
  searchPath: "/search?q={query}",
  detailPathTemplate: "/stocks/{id}",
  maxNewsCount: 3,
  autoCompleteTrigger: "@stock ",
  demoMode: true
};

const DEMO_STOCKS: StockDetail[] = [
  {
    id: "2330",
    symbol: "2330",
    name: "台積電",
    market: "TWSE",
    exchange: "上市",
    sector: "半導體",
    businessSummary: "全球晶圓代工龍頭，提供先進製程、成熟製程與先進封裝服務，受惠 AI、HPC 與手機晶片需求。",
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
        title: "台積電法說優於預期，市場關注先進封裝擴產",
        url: "https://example.com/news/tsmc-earnings",
        source: "示意新聞",
        publishedAt: "2026-04-16"
      },
      {
        title: "CoPoS 與 CoWoS 進度更新，AI 需求持續強勁",
        url: "https://example.com/news/tsmc-copos",
        source: "示意新聞",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "官方網站", url: "https://www.tsmc.com" },
      { label: "Yahoo 股市", url: "https://tw.stock.yahoo.com/quote/2330" }
    ]
  },
  {
    id: "2303",
    symbol: "2303",
    name: "聯電",
    market: "TWSE",
    exchange: "上市",
    sector: "半導體",
    businessSummary: "全球成熟製程晶圓代工重要業者，聚焦特殊製程與穩健現金流。",
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
        title: "聯電放量漲停，市場聚焦成熟製程需求復甦",
        url: "https://example.com/news/umc-rally",
        source: "示意新聞",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "官方網站", url: "https://www.umc.com" },
      { label: "Yahoo 股市", url: "https://tw.stock.yahoo.com/quote/2303" }
    ]
  },
  {
    id: "2454",
    symbol: "2454",
    name: "聯發科",
    market: "TWSE",
    exchange: "上市",
    sector: "IC 設計",
    businessSummary: "台灣 IC 設計龍頭，產品涵蓋手機 SoC、Wi-Fi、車用與 AI 運算平台。",
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
        title: "聯發科受惠 AI 與旗艦手機晶片出貨動能",
        url: "https://example.com/news/mediatek-ai",
        source: "示意新聞",
        publishedAt: "2026-04-16"
      }
    ],
    references: [
      { label: "官方網站", url: "https://www.mediatek.com" },
      { label: "Yahoo 股市", url: "https://tw.stock.yahoo.com/quote/2454" }
    ]
  }
];

export default class StockInfoCardPlugin extends Plugin {
  settings!: StockCardPluginSettings;
  private stockService!: StockDataService;

  async onload() {
    await this.loadSettings();
    this.stockService = new StockDataService(this.settings);

    this.addCommand({
      id: "search-stock-and-insert-card",
      name: "Search stock and insert card",
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
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

  async insertCardFromSearchItem(item: StockSearchItem, editor: Editor) {
    try {
      const detail = await this.stockService.getStockDetail(item.id, this.settings.maxNewsCount);
      const markdown = renderStockCard(detail, this.settings.maxNewsCount);
      insertAtCursor(editor, markdown);
      new Notice(`已插入 ${detail.symbol} ${detail.name} 資訊卡`);
    } catch (error) {
      console.error(error);
      new Notice(`插入股票卡失敗：${getErrorMessage(error)}`);
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    await this.reloadService();
  }
}

class StockDataService {
  constructor(private settings: StockCardPluginSettings) {}

  async searchStocks(query: string): Promise<StockSearchItem[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    if (this.settings.demoMode) {
      return this.searchDemo(trimmed);
    }

    const url = joinUrl(
      this.settings.apiBaseUrl,
      this.settings.searchPath.replace("{query}", encodeURIComponent(trimmed))
    );
    const response = await requestUrl({ url, method: "GET" });
    const json = response.json;

    if (Array.isArray(json)) {
      return json as StockSearchItem[];
    }
    if (Array.isArray(json?.items)) {
      return json.items as StockSearchItem[];
    }
    throw new Error("搜尋 API 回傳格式不正確");
  }

  async getStockDetail(id: string, maxNewsCount: number): Promise<StockDetail> {
    if (this.settings.demoMode) {
      const found = DEMO_STOCKS.find((item) => item.id === id || item.symbol === id);
      if (!found) throw new Error(`找不到股票：${id}`);
      return {
        ...found,
        news: (found.news || []).slice(0, maxNewsCount)
      };
    }

    const url = joinUrl(
      this.settings.apiBaseUrl,
      this.settings.detailPathTemplate.replace("{id}", encodeURIComponent(id))
    );
    const response = await requestUrl({ url, method: "GET" });
    const detail = response.json as StockDetail;

    if (!detail?.symbol || !detail?.name) {
      throw new Error("股票詳情 API 回傳格式不正確");
    }

    return {
      ...detail,
      news: (detail.news || []).slice(0, maxNewsCount)
    };
  }

  private searchDemo(query: string): StockSearchItem[] {
    const lower = query.toLowerCase();
    return DEMO_STOCKS.filter((stock) => {
      return [stock.id, stock.symbol, stock.name, stock.sector, stock.businessSummary]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(lower));
    }).map((stock) => ({
      id: stock.id,
      symbol: stock.symbol,
      name: stock.name,
      market: stock.market,
      exchange: stock.exchange
    }));
  }
}

class StockSearchModal extends SuggestModal<StockSearchItem> {
  constructor(
    app: App,
    private stockService: StockDataService,
    private onChoose: (item: StockSearchItem) => Promise<void>
  ) {
    super(app);
    this.setPlaceholder("輸入股票代號、公司名稱或關鍵字");
    this.emptyStateText = "找不到符合的股票";
  }

  async getSuggestions(query: string): Promise<StockSearchItem[]> {
    return this.stockService.searchStocks(query);
  }

  renderSuggestion(item: StockSearchItem, el: HTMLElement) {
    el.addClass("stock-card-suggestion");
    el.createDiv({ text: `${item.symbol} ${item.name}`, cls: "stock-card-suggestion-title" });
    el.createDiv({
      text: [item.exchange, item.market].filter(Boolean).join(" • "),
      cls: "stock-card-suggestion-meta"
    });
  }

  async onChooseSuggestion(item: StockSearchItem): Promise<void> {
    await this.onChoose(item);
  }
}

class StockEditorSuggest extends EditorSuggest<StockSearchItem> {
  constructor(
    app: App,
    private stockService: StockDataService,
    private settings: StockCardPluginSettings,
    private plugin: StockInfoCardPlugin
  ) {
    super(app);
  }

  onTrigger(cursor: EditorPosition, editor: Editor, _file: TFile | null): EditorSuggestContext | null {
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

  async getSuggestions(context: EditorSuggestContext): Promise<StockSearchItem[]> {
    return this.stockService.searchStocks(context.query);
  }

  renderSuggestion(item: StockSearchItem, el: HTMLElement): void {
    el.addClass("stock-card-suggestion");
    el.createDiv({ text: `${item.symbol} ${item.name}`, cls: "stock-card-suggestion-title" });
    el.createDiv({
      text: [item.exchange, item.market].filter(Boolean).join(" • "),
      cls: "stock-card-suggestion-meta"
    });
  }

  async selectSuggestion(item: StockSearchItem, evt: MouseEvent | KeyboardEvent): Promise<void> {
    const editor = this.context?.editor;
    if (!editor || !this.context) return;
    evt.preventDefault();

    editor.replaceRange("", this.context.start, this.context.end);
    await this.plugin.insertCardFromSearchItem(item, editor);
    this.close();
  }
}

class StockInfoCardSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: StockInfoCardPlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Stock Info Card 設定" });

    new Setting(containerEl)
      .setName("Demo mode")
      .setDesc("使用內建示範資料。開發初期建議開啟，接上正式 API 後可關閉。")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.demoMode)
          .onChange(async (value) => {
            this.plugin.settings.demoMode = value;
            await this.plugin.saveSettings();
            this.display();
          })
      );

    new Setting(containerEl)
      .setName("API base URL")
      .setDesc("例如：http://localhost:8787")
      .addText((text) =>
        text
          .setPlaceholder("http://localhost:8787")
          .setValue(this.plugin.settings.apiBaseUrl)
          .onChange(async (value) => {
            this.plugin.settings.apiBaseUrl = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Search path")
      .setDesc("支援 {query} 變數，例如：/search?q={query}")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.searchPath)
          .onChange(async (value) => {
            this.plugin.settings.searchPath = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Detail path template")
      .setDesc("支援 {id} 變數，例如：/stocks/{id}")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.detailPathTemplate)
          .onChange(async (value) => {
            this.plugin.settings.detailPathTemplate = value.trim();
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Max news count")
      .setDesc("插入資訊卡時最多保留幾則新聞")
      .addText((text) =>
        text
          .setPlaceholder("3")
          .setValue(String(this.plugin.settings.maxNewsCount))
          .onChange(async (value) => {
            const parsed = Number(value);
            this.plugin.settings.maxNewsCount = Number.isFinite(parsed) && parsed > 0 ? parsed : 3;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Autocomplete trigger")
      .setDesc("在編輯器輸入此觸發字串後會開始搜尋，例如：@stock ")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.autoCompleteTrigger)
          .onChange(async (value) => {
            this.plugin.settings.autoCompleteTrigger = value || "@stock ";
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "API 回傳格式" });
    containerEl.createEl("p", {
      text: "Search API 可回傳陣列或 { items: [...] }；Detail API 需回傳 symbol、name、price、news、references 等欄位。"
    });
  }
}

function renderStockCard(detail: StockDetail, maxNewsCount: number): string {
  const header = `> [!info] ${detail.symbol} ${detail.name}`;
  const lines = [header];

  lines.push(`> **市場**：${[detail.exchange, detail.market].filter(Boolean).join(" / ") || "N/A"}  `);
  lines.push(`> **產業**：${detail.sector || "N/A"}  `);

  if (detail.businessSummary) {
    lines.push(`> **業務**：${detail.businessSummary}  `);
  }

  if (detail.price) {
    lines.push(`> **近期價格**：  `);
    lines.push(`> - 現價：${formatPrice(detail.price)}  `);
    lines.push(`> - 日：${formatPercent(detail.price.changePctDay)}  `);
    lines.push(`> - 週：${formatPercent(detail.price.changePctWeek)}  `);
    lines.push(`> - 月：${formatPercent(detail.price.changePctMonth)}  `);
    if (detail.price.asOf) {
      lines.push(`> - 更新時間：${detail.price.asOf}  `);
    }
  }

  const news = (detail.news || []).slice(0, maxNewsCount);
  if (news.length > 0) {
    lines.push(`> **最近新聞**：  `);
    for (const item of news) {
      const meta = [item.source, item.publishedAt].filter(Boolean).join(" • ");
      lines.push(`> - [${item.title}](${item.url})${meta ? `（${meta}）` : ""}  `);
    }
  }

  const references = [...(detail.references || [])];
  if (detail.website) {
    references.unshift({ label: "公司官網", url: detail.website });
  }
  if (references.length > 0) {
    lines.push(`> **更多資料**：  `);
    for (const link of dedupeReferences(references)) {
      lines.push(`> - [${link.label}](${link.url})  `);
    }
  }

  return `${lines.join("\n")}\n\n`;
}

function insertAtCursor(editor: Editor, markdown: string) {
  const cursor = editor.getCursor();
  const prefix = cursor.ch === 0 ? "" : "\n\n";
  editor.replaceRange(prefix + markdown, cursor);
}

function formatPrice(price: StockPriceSnapshot): string {
  const currency = price.currency ? ` ${price.currency}` : "";
  return `${price.current}${currency}`;
}

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function dedupeReferences(links: StockReferenceLink[]): StockReferenceLink[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.url)) return false;
    seen.add(link.url);
    return true;
  });
}
