/**
 * This maps synonyms for doctrine, 
 * used to replace all synonym to a base synonym
 */
export default {
    module: ["namespace", "memberOf"],
    name: ["class", "type"],
    description: ["summary", "desc", "classdesc"],
    param: ["property", "arg", "argument", "prop", "member"],

    // params:
    bool: ["boolean"],
    number: ["float", "int", "integer", "double"],
    node: ["jsx", "react.reactelement", "reactelement"],
};