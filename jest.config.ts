export default {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "jest-environment-jsdom",
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@reusables/(.*)$": "<rootDir>/src/reusables/$1",
        "^layout/(.*)$": "<rootDir>/src/layout/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
    },
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
    },
};
