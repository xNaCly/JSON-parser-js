import { expect, test, describe } from "vitest";
import { Lexer } from "../src/lexer";
import { Parser } from "../src/parser";

describe("test", () => {
  let input = `{ "key": "value", "key2": "value2", "x": { "x1": "x1value" } }`;;

  const l = new Lexer(input);
  const p = new Parser(l);

  console.log(p)

  const expected = {
    type: 'Object',
    children: [
      {
        type: 'String',
        value: 'value',
        token: { line: 0, column: 17, raw: ',', type: 12 }
      },
      {
        type: 'String',
        value: 'value2',
        token: { line: 0, column: 35, raw: ',', type: 12 }
      },
      {
        type: 'Object',
        children: [
          {
            type: 'String',
            value: 'x1value',
            token: { line: 0, column: 60, raw: '}', type: 8 }
          }
        ],
        token: { line: 0, column: 42, raw: '{', type: 7 }
      }
    ],
    token: { line: 0, column: 1, raw: '{', type: 7 }
  }

  test("should parse", () => {
    expect(p.parse()).toEqual(expected);
  });
})
