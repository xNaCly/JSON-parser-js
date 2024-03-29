import { expect, test, describe } from "vitest";
import { Lexer, TokenType } from "../src/lexer";

describe("whitespace", () => {
  let inputs = [
    "   ",
    "\t\t\t\t\t\t",
    "\n\n\t\t\t\t",
    "  \n\r",
    // TODO: comments:
    // "// comment\n",
    // "// comment\n//comment 2",
  ];
  for (const input of inputs) {
    test(input, () => {
      let l = new Lexer(input);
      expect(l.next().type).toBe(TokenType.EOF);
    });
  }
});

describe("symbols", () => {
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
    test(TokenType[type], () => {
      expect(l.next().type).toBe(type);
    });
  }
});

describe("keywords", () => {
  let inputs = ["true", "false", "null"];
  let expected = [TokenType.TRUE, TokenType.FALSE, TokenType.NULL];
  for (let i = 0; i < inputs.length; i++) {
    test(inputs[i], () => {
      let l = new Lexer(inputs[i]);
      expect(l.next().type).toBe(expected[i]);
    });
  }
});

describe("string", () => {
  let inputs = [
    '"this is a string"',
    '"secondary string\n\tlol"',
    '"string with all json standard things\\/\b\f\n\r\t\u0058"',
    // TODO: support this somehow
    // `"string with escaped \""`,
  ];
  let expected = [
    {
      type: TokenType.STRING,
      val: "this is a string",
    },
    {
      type: TokenType.STRING,
      val: "secondary string\n\tlol",
    },
    {
      type: TokenType.STRING,
      val: "string with all json standard things\\/\b\f\n\r\t\u0058",
    },
    // TODO: support this somehow
    // {
    //   type: TokenType.STRING,
    //   val: `string with escaped \"`,
    // },
  ];
  for (let i = 0; i < inputs.length; i++) {
    test(inputs[i], () => {
      let l = new Lexer(inputs[i]);
      let tok = l.next();
      expect(tok.type).toBe(expected[i].type);
      expect(tok.raw).toBe(expected[i].val);
    });
  }
});

describe("number", () => {
  let inputs = ["12", "12.5", "-12.5", "-120.5e+3", "391.38E-12"];
  let expected = [
    {
      type: TokenType.NUMBER,
      val: "12",
    },
    {
      type: TokenType.NUMBER,
      val: "12.5",
    },
    {
      type: TokenType.NUMBER,
      val: "-12.5",
    },
    {
      type: TokenType.NUMBER,
      val: "-120.5e+3",
    },
    {
      type: TokenType.NUMBER,
      val: "391.38E-12",
    },
  ];
  for (let i = 0; i < inputs.length; i++) {
    test(inputs[i], () => {
      let l = new Lexer(inputs[i]);
      let tok = l.next();
      expect(tok.type).toBe(expected[i].type);
      expect(tok.raw).toBe(expected[i].val);
    });
  }
});
