import _ from 'underscore';
import doctrine  from 'doctrine-standalone';
import replaceSynonyms from './synonymService';

/**
 * Parse the JSDoc and turn them into pretty object, if received a "final-form" object - we will just pass it
 * @param {Object} libraryDocs mapping between component name 
 */
export function parseDocumentation(libraryDocs) {
    let docs = {};
    const componentsNames = _.keys(libraryDocs);
    for (let i = 0, l = componentsNames.length; i < l; i++) {
        const name = componentsNames[i];
        let doc = libraryDocs[name];
        let parsedDoc;
        if (typeof doc === 'string') {
            let ast = doctrine.parse(doc, {unwrap: true, recoverable: true, sloppy: true});
            parsedDoc = replaceSynonyms(prettifyAst(ast));
        } else {
            parsedDoc = doc; // already an object
        }
        docs[name] = parsedDoc;
    }
    
    return docs;
}

function prettifyAst({tags}) {
    let doc = {};
    for (let i in tags) {
        let tag = tags[i];
        doc[tag.title] = doc[tag.title] || [];
        doc[tag.title].push(tag);
    }
    return doc;
}