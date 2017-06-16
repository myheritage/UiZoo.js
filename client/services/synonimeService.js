import _ from "underscore";
import synonimes from "../constants/doctrineSynonymes";

/**
 * Replaces doctrine documentation params with base synonimes from synonime map
 * @param {*} docObject The generated documentaiton object
 */
export default function replaceSynonimes(docObject) {
    let newDocObject = {};

    _.keys(docObject).forEach(currDocKey => {
        // Get the base synonime for the current key
        let baseSynonimeKey = getBaseSynonime(currDocKey);
        
        // Get the created doctrine object
        let currDocObject = docObject[currDocKey];

        // Change the title with the base synonime
        currDocObject[0].title = baseSynonimeKey;

        // Create new property with base synonime for key 
        newDocObject[baseSynonimeKey] = currDocObject;
    });

    return newDocObject;
};

/**
 * Returns the base synonime for the used key, if doesn't exist returns the give docKeySynonime
 * @param {*} docKeySynonime The used doctrine key
 */
function getBaseSynonime(docKeySynonime) {
    return _.findKey(synonimes, currSynonimeOptions => currSynonimeOptions.includes(docKeySynonime)) || docKeySynonime;
}