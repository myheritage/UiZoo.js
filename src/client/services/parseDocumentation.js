import doctrine  from "doctrine";

export function parseDocumentation(libraryDocs) {
    let docs = {};
    for (let name in libraryDocs) {
        let doc = libraryDocs[name];
        let ast = doctrine.parse(doc, {unwrap: true, recoverable: true, sloppy: true});
        let parsedDoc = getDoc(ast);
        docs[name] = parsedDoc;
    }
    return docs;
}

function getDoc(ast) {
    let doc = {};
    for (let i in tags) {
        let tag = tags[i];
        doc[tag.title] = tag;
    }
    return doc;
}