# Tree sitter grammar for Monicelli come se fosse antani
This repo contains an unofficial tree-sitter grammar for the [Monicelli language](https://github.com/esseks/monicelli).

There are two minor differences with the actual grammar used by Monicelli. They are due to the tokenizer implementation and would require some extra work in C (and who wants that?)

* comments with `bituma` are supposed to be valid only at the beginning of a line, unlike `#`. This grammar handles them the same way, while in proper Monicelli you could name a variable or a function `bituma`.
* reserved keywords are not enforced, see https://github.com/tree-sitter/tree-sitter/pull/3896
