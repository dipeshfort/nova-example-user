
module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**'
    ],
    coverageDirectory: 'reports',
    reporters: [
        [
            "jest-junit", {
                suiteName: 'jest tests',
                output: './reports/junit.xml'
            }
        ],
        'default'
    ]
};