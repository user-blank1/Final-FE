module.exports = {
    extends: ["stylelint-config-standard-scss"],
    plugins: ["stylelint-scss"],
    rules: {
        "declaration-property-value-disallowed-list": {
            "/.*/": ["/px/"], // Disallow any px unit in any property value
        },
    },
};
