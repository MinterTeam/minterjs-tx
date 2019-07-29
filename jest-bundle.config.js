module.exports = {
    setupFilesAfterEnv: ["<rootDir>/jest-bundle-setup.js"],
    moduleNameMapper: {
        '~\/src$': '<rootDir>/dist/index.js',
        // 'safe-buffer': require.resolve('buffer-es6')
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(minterjs-util|minterjs-tx|buffer-es6)/)',
    ],
};
