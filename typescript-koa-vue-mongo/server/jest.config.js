module.exports = {
  preset: 'ts-jest',
  transform: {
    "\\.[jt]sx?$": "ts-jest"
  },
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: false,
  testMatch: [
    "**/*.spec.ts",
  ],
};