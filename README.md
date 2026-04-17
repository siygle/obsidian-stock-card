# Stock Info Card

Obsidian plugin MVP：搜尋股票代號 / 公司名稱，插入股票資訊卡。

## 已實作功能

- Command Palette：`Search stock and insert card`
- 編輯器 autocomplete：輸入 `@stock ` 後開始搜尋
- 插入 Markdown callout 資訊卡
- 顯示：
  - 公司基本資訊
  - 最近價格（日 / 週 / 月）
  - 最近新聞
  - 參考連結
- 支援 Demo mode、可設定 API endpoint
- 支援選填 API key 與自訂 HTTP header 名稱

## 開發

```bash
npm install
npm run build
```

將下列檔案複製到 Obsidian vault 的 plugin 目錄：

- `manifest.json`
- `main.js`
- `styles.css`

例如：

```bash
mkdir -p <vault>/.obsidian/plugins/stock-info-card
cp manifest.json main.js styles.css <vault>/.obsidian/plugins/stock-info-card/
```

## 使用方式

### 1. Command Palette

執行：

- `Search stock and insert card`

### 2. 編輯器 autocomplete

在筆記中輸入：

```text
@stock 2330
```

或：

```text
@stock 台積電
```

選擇候選股票後，plugin 會直接插入資訊卡。

## 設定項目

- `API base URL`：後端 API 主機位址
- `Search path`：搜尋 API 路徑，支援 `{query}`
- `Detail path template`：詳情 API 路徑，支援 `{id}`
- `API key`：選填；若後端需要驗證可填入
- `API key header name`：選填；預設 `x-api-key`，也可改成 `Authorization` 或其他自訂 header

範例：

- 若後端使用 `x-api-key`：
  - `API key` = `your-secret`
  - `API key header name` = `x-api-key`
- 若後端使用 `Authorization`：
  - `API key` = `Bearer your-token`
  - `API key header name` = `Authorization`

## API 格式

當有設定 `API key` 時，plugin 會在每次請求自動帶上：

```http
x-api-key: <your-api-key>
```

若你改了 `API key header name`，就會改用你指定的 header 名稱。

### Search API

可回傳：

```json
[
  {
    "id": "2330",
    "symbol": "2330",
    "name": "台積電",
    "market": "TWSE",
    "exchange": "上市"
  }
]
```

或：

```json
{
  "items": [
    {
      "id": "2330",
      "symbol": "2330",
      "name": "台積電"
    }
  ]
}
```

### Detail API

```json
{
  "id": "2330",
  "symbol": "2330",
  "name": "台積電",
  "market": "TWSE",
  "exchange": "上市",
  "sector": "半導體",
  "businessSummary": "全球晶圓代工龍頭...",
  "website": "https://www.tsmc.com",
  "price": {
    "current": 950,
    "changePctDay": 1.2,
    "changePctWeek": 4.8,
    "changePctMonth": 12.3,
    "currency": "TWD",
    "asOf": "2026-04-16"
  },
  "news": [
    {
      "title": "台積電法說優於預期",
      "url": "https://example.com/news/1",
      "source": "鉅亨網",
      "publishedAt": "2026-04-16"
    }
  ],
  "references": [
    {
      "label": "Yahoo 股市",
      "url": "https://tw.stock.yahoo.com/quote/2330"
    }
  ]
}
```

## 下一步建議

- 接上你的台股 backend / `tw-stock-db`
- 補股票小圖 / sparkline
- 支援 `stock-card` code block renderer
- 支援關鍵字搜尋（AI / CoWoS / Apple 供應鏈）
