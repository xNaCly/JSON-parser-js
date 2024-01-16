import { Lexer, TokenType, Token } from './lexer';

export interface ASTNode {
  // TODO: how to handle "Error"?
  type: 'String' | 'Object' | 'Array' | 'Error';
  value?: string | number | boolean | null;
  token: Token;
  children?: ASTNode[];
}

export class Parser {
  private lexer: Lexer;
  private currentToken: Token;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.next();
  }

  parse(): ASTNode {
    return this.parseValue();
  }

  private parseValue(): ASTNode {
    switch (this.currentToken.type) {
      case TokenType.STRING:
      case TokenType.NUMBER:
      case TokenType.TRUE:
      case TokenType.FALSE:
      case TokenType.NULL:
        const value = this.currentToken.raw;
        this.consumeToken();
        return { type: 'String', value, token: this.currentToken };

      case TokenType.LEFT_CURLY:
        return this.parseObject();

      case TokenType.LEFT_BRAKET:
        return this.parseArray();

      default:
        throw new Error(`Unexpected token: ${this.currentToken.type}`);
    }
  }

  private parseObject(): ASTNode {
    const objectNode: ASTNode = { type: 'Object', children: [], token: this.currentToken };

    this.consumeToken(TokenType.LEFT_CURLY);

    while (this.currentToken.type !== TokenType.RIGHT_CURLY) {
      this.consumeToken(TokenType.STRING);

      this.consumeToken(TokenType.COLON);

      const value = this.parseValue();
      objectNode.children?.push(value);

      if (this.currentToken.type === TokenType.COMMA) {
        this.consumeToken(TokenType.COMMA);
      } else {
        break;
      }
    }

    this.consumeToken(TokenType.RIGHT_CURLY);

    return objectNode;
  }

  private parseArray(): ASTNode {
    const arrayNode: ASTNode = { type: 'Array', children: [], token: this.currentToken };

    this.consumeToken(TokenType.LEFT_BRAKET);

    while (this.currentToken.type !== TokenType.RIGHT_BRAKET) {
      const value = this.parseValue();
      arrayNode.children?.push(value);

      if (this.currentToken.type === TokenType.COMMA) {
        this.consumeToken(TokenType.COMMA);
      } else {
        break;
      }
    }

    this.consumeToken(TokenType.RIGHT_BRAKET);

    return arrayNode;
  }

  private consumeToken(expectedType?: TokenType): void {
    // How to handle this?
    if (expectedType && this.currentToken.type !== expectedType) {
      throw new Error(`Unexpected token: ${this.currentToken.type}`);
    }

    this.currentToken = this.lexer.next();
  }
}
