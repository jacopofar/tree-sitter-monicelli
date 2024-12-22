/**
* @file Monicelli language
* @author Jacopo Farina
* @license MIT
*/

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "monicelli",

  rules: {
    source_file: $ => repeat(choice($.any_function, $.variable_declaration)),
    any_function: $ => choice($.main_function, $.non_main_function),
    main_function: $ => seq(
      field('main_start', 'Lei ha clacsonato'),
      repeat($.statement),
      prec(3, $.return),
    ),
    function_arguments_def: $ => seq(repeat(seq($.variable_name, $.variable_type, ',')),$.variable_name, $.variable_type),
    function_arguments_call: $ => seq(repeat(seq($.expression, ',')),$.expression),

    non_main_function: $ => seq(
      choice('blinda la supercazzola', 'blinda la supercazzora'),
      optional($.variable_type),
      field('function_name', $.variable_name),
      optional(seq('con', $.function_arguments_def)),
      'o scherziamo?',
      repeat($.statement),
      prec(3, $.return),
    ),
    return: $ => choice(
      seq('vaffanzum', $.expression, '!'),
      'vaffanzum!'
    ),
    number: $ => /\d+/,
    operator: $ => choice('più', 'meno', 'per', 'diviso'),
    invocation: $ => seq('brematurata la supercazzola', field('function_to_call', $.variable_name), optional(seq('con', $.function_arguments_call)), 'o scherziamo?'),
    expression: $ => choice(
      field('variable', $.variable_name),
      field('const_number', $.number),
      field('op_and_operands',
        prec.left(5, seq(field('left', $.expression), $.operator, field('right', $.expression))),
      ),
      field('invocation', $.invocation),
    ),
    article: $ => choice('il', 'la', 'lo', 'i', 'gli', 'le', 'un', 'una', 'dei', 'delle', "l'", "un'"),
    variable_name: $ => choice(
      /[a-zA-Z][a-zA-Z0-9]*/,
      seq($.article, /[a-zA-Z][a-zA-Z0-9]*/)
    ),
    // TODO this is not really preventing reserved words from being used as variable names!
    reserved_word: $ => prec(2,choice(
      'conte',
      'scusi noi siamo in',
      'con rinforzino',
    )),
    assign_value: $ => seq(
      choice('come fosse', 'come se fosse'),
      field('expression', $.expression),
    ),
    assignment: $ => seq(
      field('variable_name', $.variable_name),
      $.assign_value,
    ),
    variable_type: $ => choice('Necchi', 'Mascetti', 'Perozzi', 'Melandri', 'Sassaroli'),
    variable_declaration: $ => seq(
      'voglio',
      field('variable_name', $.variable_name),
      ',',
      field('variable_type', $.variable_type),
      field('assignment', optional($.assign_value)),
    ),
    print: $ => seq(
      field('expression', $.expression),
      'a posterdati',
    ),
    input: $ => seq(
      'mi porga',
      $.variable_name,
    ),
    comparison: $ => choice('maggiore di', 'minore di', 'maggiore uguale a', 'maggiore uguale di', 'minore uguale a', 'minore uguale di'),
    condition: $ => seq(
      field('left', $.expression),
      $.comparison,
      field('right', $.expression),
    ),
    loop: $ => seq(
      'stuzzica',
      repeat($.statement),
      'e brematura anche, se',
      $.condition,
    ),
    multi_branch_condition: $ => choice(
      seq($.comparison, field('right', $.expression)),
      $.expression,
    ),
    multi_branch: $ => seq(
      "che cos'è",
      $.variable_name,
      '?',
      $.multi_branch_condition,
      ':',
      repeat1($.statement),
      repeat(seq('o magari', $.multi_branch_condition, ':', repeat1($.statement))),
      optional(seq('o terapia tapioco:', repeat1($.statement))),
      'e velocità di esecuzione'
    ),
    statement: $ => choice(
      $.assignment,
      $.variable_declaration,
      $.print,
      $.input,
      $.return,
      $.loop,
      $.multi_branch,
    ),
    }
  });
