# SVG Trace

画像をアップロードするか、AIで生成して、Google Gemini（`gemini-2.5-flash`）で SVG ベクターに変換する Web アプリです。

**公開サイト:** https://whinaotona-debug.github.io/svg-trace/

`index.html` をブラウザで開くだけでも使えます。

## 使い方

1. [Google AI Studio](https://aistudio.google.com/apikey) で Gemini API キーを発行する
2. `index.html` をブラウザで開く
3. 画面上部に API キーを入力して「保存」する（このブラウザの localStorage にだけ保存されます）
4. 画像をアップロードするか、「AIで画像を生成」する
5. 「ベクター（SVG）に変換」→ ダウンロード

## ローカルでキーを自動入力したい場合

`config.example.js` を `config.local.js` にコピーし、自分のキーを書いてください。`config.local.js` は Git に含まれません。

```bash
cp config.example.js config.local.js
```

## 公開時の注意

API キーを `index.html` や GitHub に直接書かないでください。漏洩したキーは [Google AI Studio](https://aistudio.google.com/apikey) で無効化・再発行してください。
