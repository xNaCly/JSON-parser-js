import { expect, test } from "vitest";
import { Lexer, TokenType } from "../src/lexer";

test("whitespace", () => {
  let inputs = [
    "   ",
    "\t\t\t\t\t\t",
    "\n\n\t\t\t\t",
    "  \n\r",
    // TODO: ignore comments: //
    // "// comment\n",
  ];
  for (const input of inputs) {
    let l = new Lexer(input);
    expect(l.next().type).toBe(TokenType.EOF);
  }
});

test("symbols", () => {
  let input = "{}[],:";
  let expected = [
    TokenType.LEFT_CURLY,
    TokenType.RIGHT_CURLY,
    TokenType.LEFT_BRAKET,
    TokenType.RIGHT_BRAKET,
    TokenType.COMMA,
    TokenType.COLON,
    TokenType.EOF,
  ];
  let l = new Lexer(input);
  for (const type of expected) {
    expect(l.next().type).toBe(type);
  }
});

test("keywords", () => {
  let inputs = ["true", "false", "null"];
  let expected = [TokenType.TRUE, TokenType.FALSE, TokenType.NULL];
  for (let i = 0; i < inputs.length; i++) {
    let l = new Lexer(inputs[i]);
    expect(l.next().type).toBe(expected[i]);
  }
});
