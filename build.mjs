// @ts-check
import * as esbuild from "esbuild";

import configs from "./esbuild.config.mjs";

console.time("Esbuild time");
const allPromises = configs.map((el) => esbuild.build(el));
await Promise.all(allPromises);
console.timeEnd("Esbuild time");
