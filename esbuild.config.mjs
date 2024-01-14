// @ts-check

/** @type {import ("esbuild").BuildOptions[]} */
const configs = [
  {
    entryPoints: ["./src/index.ts"],
    bundle: true,
    outfile: "./dist/index.js",
    minify: true,
    sourcemap: true,
  },
];
export default configs;
