module.exports = {
    moduleNameMapper: {
        '~(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(minterjs-util|minterjs-tx)/)',
    ],
    // collectCoverage: true,
    collectCoverageFrom: ["./src/**"],
    coverageReporters: ["lcov", "text"]
};
