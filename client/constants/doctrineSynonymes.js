/**
 * This maps synonimes for doctrine, 
 * used to replace all synonime to a base synonime for bibliotheca usage
 */
export default {
    bool: ["boolean"],
    number: ["float", "int", "integer", "double"],
    module: ["namespace", "memberOf"],
    name: ["class", "type"],
    description: ["summary", "desc", "classdesc"],
    param: ["property", "arg", "argument", "prop", "member"],
};