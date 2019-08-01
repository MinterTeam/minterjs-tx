module.exports = {
    setupFilesAfterEnv: ["<rootDir>/jest-bundle-setup.js"],
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
