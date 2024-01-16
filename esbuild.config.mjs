// @ts-check

/** @type {import ("esbuild").BuildOptions[]} */
const configs = [
  {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./dist/index.cjs",
    format: "cjs",
    minify: true,
    sourcemap: true,
  },
  {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./dist/index.mjs",
    format: "esm",
    minify: true,
    sourcemap: true,
  },
  {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./dist/index.js",
    format: "iife",
    minify: true,
    sourcemap: true,
  }
];
export default configs;
