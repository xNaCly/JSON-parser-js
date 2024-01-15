// Tokenizing elements contained in the JSON spec: https://www.json.org/json-en.html

enum TokenType {
  UNKNOWN,
  EOF,

  STRING,
  NUMBER,
  TRUE,
  FALSE,
  NULL,

  LEFT_CURLY,
  RIGHT_CURLY,
  LEFT_BRAKET,
  RIGHT_BRAKET,

  COLON,
  COMMA,
}

// TODO: values: string, number, false, true, null
// TODO: ignore comments: //

interface Token {
  line: number;
  column: number;
  raw: string;
  type: TokenType;
}

export class Lexer {
  private column: number;
  private line: number;
  private input: string;
  private pos: number;
  private cc: string;

  constructor(input: string) {
    this.input = input;
    this.column = 0;
    this.line = 0;
    this.pos = 0;
    this.cc = input.charAt(this.pos);
  }

  lex(): Token[] {
    let tokens: Token[] = [];

    for (; this.cc != ""; ) {
      this.skipWhiteSpace();
      let type = TokenType.UNKNOWN;
      switch (this.cc) {
        case "{":
          type = TokenType.LEFT_CURLY;
        case "}":
          type = TokenType.RIGHT_CURLY;
        case "[":
          type = TokenType.LEFT_BRAKET;
        case "]":
          type = TokenType.RIGHT_BRAKET;
        case ":":
          type = TokenType.COLON;
        case ",":
          type = TokenType.COMMA;
        case '"':
          tokens.push(this.string());
          continue;
        default:
          if (this.cc == "-" || (this.cc <= "0" && this.cc >= "9")) {
            tokens.push(this.number());
            continue;
          }
      }

      tokens.push(this.makeToken(type, this.cc));
      this.advance();
    }

    tokens.push(this.makeToken(TokenType.EOF, "EOF"));
    return tokens;
  }

  private string(): Token {
    throw new Error("Not implemented");
  }

  private number(): Token {
    throw new Error("Not implemented");
  }

  private makeToken(type: TokenType, raw?: string): Token {
    return {
      line: this.line,
      column: this.column,
      raw: raw || "",
      type,
    };
  }

  private skipWhiteSpace() {
    outer: for (; this.cc != ""; this.advance()) {
      switch (this.cc) {
        case " ":
        case "\n":
          this.line++;
          this.column = 0;
        case "\r":
        case "\t":
          break;
        default:
          break outer;
      }
    }
  }

  private advance() {
    this.column++;
    this.pos++;
    this.cc = this.input.charAt(this.pos);
  }
}
