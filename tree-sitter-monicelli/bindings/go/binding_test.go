package tree_sitter_monicelli_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_monicelli "github.com/tree-sitter/tree-sitter-monicelli/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_monicelli.Language())
	if language == nil {
		t.Errorf("Error loading Monicelli grammar")
	}
}
