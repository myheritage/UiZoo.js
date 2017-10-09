import _ from "underscore";
import synonyms from "../constants/doctrineSynonyms";

/**
 * Replaces doctrine documentation params with base synonyms from synonym map
 * @param {Object} docObject The generated documentation object
 */
export default function replaceSynonyms(docObject) {
    let newDocObject = {};

    _.keys(docObject).forEach(currDocKey => {
        // Get the base synonyms for the current key
        let baseSynonymKey = getBaseSynonym(currDocKey);

        // Get the created doctrine object
        let currDocObject = docObject[currDocKey];

        // Change the title with the base synonym
        currDocObject[0].title = baseSynonymKey;

        // Create new property or add to existent with base synonyms for key 
        if (newDocObject[baseSynonymKey] && Array.isArray(newDocObject[baseSynonymKey])) {
            newDocObject[baseSynonymKey] = newDocObject[baseSynonymKey].concat(currDocObject);
        } else {
            newDocObject[baseSynonymKey] = currDocObject;
        }
    });

    return newDocObject;
};

/**
 * Returns the base synonyms for the used key, if doesn't exist returns the give docKeySynonyms
 * @param {string} docKeySynonym The used doctrine key
 */
export function getBaseSynonym(docKeySynonym) {
    return _.findKey(synonyms, currSynonymOptions => _.contains(currSynonymOptions, docKeySynonym)) || docKeySynonym;
}