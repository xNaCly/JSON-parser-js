import { expect, test } from "vitest";
import { Lexer } from "../src/lexer";

test("first test", () => {
  const lexer = new Lexer("test");
  console.log(lexer.lex());
});
