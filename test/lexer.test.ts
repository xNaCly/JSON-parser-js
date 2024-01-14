import { expect, test } from "vitest";
import { Lexer } from "../src/lexer";

test("first test", () => {
  const lexer = new Lexer();
  lexer.lex("test");
});
