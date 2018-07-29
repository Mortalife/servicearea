module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "node": true,
        "es6": true
    },
    "parser": "typescript-eslint-parser",
    "plugins": [
        "typescript"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "no-undef": "off",
        "typescript/no-unused-vars": "error",
        "typescript/interface-name-prefix": 0,
        "typescript/member-ordering": 1
    }
};