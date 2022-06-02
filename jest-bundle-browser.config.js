module.exports = {
    // testEnvironment: 'jsdom',
    // @see https://github.com/facebook/jest/issues/12586#issuecomment-1073298261
    testEnvironment: '<rootDir>/jest-bundle-browser-env.js',
    setupFilesAfterEnv: ["<rootDir>/jest-bundle-browser-setup.js"],
    moduleNameMapper: {
        '~\/src$': '<rootDir>/dist/index.js',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(buffer-es6)/)',
    ],
};
