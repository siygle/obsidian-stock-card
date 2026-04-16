import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";

const banner = `/* eslint-disable */\nthis.require = require;\nthis.module = module;\nthis.exports = exports;`;
const prod = process.argv[2] === "production";

const ctx = await esbuild.context({
  banner: { js: banner },
  entryPoints: ["main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    ...builtins
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "main.js"
});

if (prod) {
  await ctx.rebuild();
  await ctx.dispose();
} else {
  await ctx.watch();
}
