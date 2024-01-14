import { Lexer } from "../lexer";

let l = new Lexer();
l.lex("test");

// TODO: structure symbols: {}[],:
// TODO: values: true, false, null, "string", number
// TODO: comments, whitespace
// TODO: error handling
