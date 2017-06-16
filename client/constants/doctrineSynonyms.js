/**
 * This maps synonyms for doctrine, 
 * used to replace all synonym to a base synonym for bibliotheca usage
 */
export default {
    bool: ["boolean"],
    number: ["float", "int", "integer", "double"],
    module: ["namespace", "memberOf"],
    name: ["class", "type"],
    description: ["summary", "desc", "classdesc"],
    param: ["property", "arg", "argument", "prop", "member"],
};