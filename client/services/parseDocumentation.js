import doctrine  from "doctrine";
import replaceSynonimes from "./synonimeService";

export function parseDocumentation(libraryDocs) {
    let docs = {};
    for (let name in libraryDocs) {
        let doc = libraryDocs[name];
        let ast = doctrine.parse(doc, {unwrap: true, recoverable: true, sloppy: true});
        let parsedDoc = getDoc(ast)
        parsedDoc = replaceSynonimes(parsedDoc);

        docs[name] = parsedDoc;
    }
    
    return docs;
}

function getDoc({tags}) {
    let doc = {};
    for (let i in tags) {
        let tag = tags[i];
        doc[tag.title] = doc[tag.title] || [];
        doc[tag.title].push(tag);
    }
    return doc;
}