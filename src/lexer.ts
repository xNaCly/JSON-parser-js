// Tokenizing elements contained in the JSON spec: https://www.json.org/json-en.html

export enum TokenType {
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

// TODO: values: string

export interface Token {
  line: number;
  column: number;
  raw?: string;
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

  next(): Token {
    while (
      this.cc == "\n" ||
      this.cc == "\t" ||
      this.cc == " " ||
      this.cc == "\r"
    ) {
      if (this.cc == "\n") {
        this.line++;
        this.column = 0;
      }
      this.advance();
    }

    if (this.isAtEnd()) return this.makeToken(TokenType.EOF);

    let type = TokenType.UNKNOWN;
    switch (this.cc) {
      case "{":
        type = TokenType.LEFT_CURLY;
        break;
      case "}":
        type = TokenType.RIGHT_CURLY;
        break;
      case "[":
        type = TokenType.LEFT_BRAKET;
        break;
      case "]":
        type = TokenType.RIGHT_BRAKET;
        break;
      case ":":
        type = TokenType.COLON;
        break;
      case ",":
        type = TokenType.COMMA;
        break;
      case '"':
        return this.string();
      case "n":
      case "t":
      case "f":
        return this.keyword();
      default:
        if (this.cc == "-" || (this.cc <= "0" && this.cc >= "9")) {
          return this.number();
        } else {
          throw new Error(`Unknown character ${this.cc}`);
        }
    }

    let cc = this.cc;
    this.advance();
    return this.makeToken(type, cc);
  }

  private keyword(): Token {
    let tt = TokenType.UNKNOWN;
    let start = this.column;

    while (!this.isAtEnd()) {
      this.advance();
    }

    switch (this.input.slice(start, this.column)) {
      case "true":
        tt = TokenType.TRUE;
        break;
      case "false":
        tt = TokenType.FALSE;
        break;
      default:
        tt = TokenType.NULL;
    }

    return {
      type: tt,
      column: this.column - start,
      line: this.line,
    };
  }

  private string(): Token {
    // skip "
    this.advance();

    let start = this.column;

    for (; !this.isAtEnd() && this.cc != '"'; this.advance()) {}

    if (this.cc != '"') {
      // TODO: fancy error handling
      throw new Error("Unterminated string");
    }

    // skip "
    this.advance();

    return {
      type: TokenType.STRING,
      column: this.column - start,
      raw: this.input.slice(start, this.column - 1),
      line: this.line,
    };
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

  private advance() {
    this.column++;
    this.pos++;
    this.cc = this.input.charAt(this.pos);
  }

  private isAtEnd(): boolean {
    return this.pos >= this.input.length;
  }
}
