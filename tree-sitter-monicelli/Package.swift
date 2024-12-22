// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterMonicelli",
    products: [
        .library(name: "TreeSitterMonicelli", targets: ["TreeSitterMonicelli"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterMonicelli",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterMonicelliTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterMonicelli",
            ],
            path: "bindings/swift/TreeSitterMonicelliTests"
        )
    ],
    cLanguageStandard: .c11
)
