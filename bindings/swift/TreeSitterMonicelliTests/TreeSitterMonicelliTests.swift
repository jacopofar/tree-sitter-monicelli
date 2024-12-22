import XCTest
import SwiftTreeSitter
import TreeSitterMonicelli

final class TreeSitterMonicelliTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_monicelli())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Monicelli grammar")
    }
}
