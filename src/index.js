import { declare } from "@babel/helper-plugin-utils";

export default declare((_, opts) => {
    const { rewrites } = opts;

    return {
        name: "rewrite-import-paths-plugin",
        visitor: {
            ImportDeclaration(path) {
                const { value } = path.node.source;
                if (rewrites[value]) {
                    path.node.source.value = rewrites[value]
                }
            }
        }
    }
})