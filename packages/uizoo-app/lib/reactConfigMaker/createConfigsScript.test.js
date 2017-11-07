const createConfigsScript = require('./createConfigsScript');
const gs = require('glob-stream').stream;
const fs = require('fs-extra');
const realFs = require('fs');
const path = require('path');

jest.mock('fs-extra');
jest.mock('glob-stream');

const docFilePath = path.join('root', '.uizoo-app', 'documentationContainer.js');
const compFilePath = path.join('root', '.uizoo-app', 'componentsContainer.js');
const getTestFile = f => realFs.readFileSync(path.join(__dirname, 'testFiles', `${f}.js`));
const configArgs = ['**/*', 'root', {ignoreTag: 'componentLibraryIgnore'}];
const mockFiles = {
    '1.js': getTestFile(1),
    '2.js': getTestFile(2),
    '3.js': getTestFile(3),
    [docFilePath]: '',
    [compFilePath]: '',
};
const getDocsFile = () => fs.__getMockFiles()[docFilePath];
const getCompsFile = () => fs.__getMockFiles()[compFilePath];
const streamFiles = (files = []) => {files.forEach(path => gs.write({path})); gs.end();};

describe('createConfigsScript', () => {
    beforeEach(() => {
        fs.__setMockFiles(Object.assign({}, mockFiles));
    });
    it('should create simple config for a component', () => {
        expect.assertions(2);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual('export default {\nComp1: `@example <Content/>\n@param {string} someProp1\n@name Comp1\n@param {node} [children] `,\n}');
            expect(getCompsFile()).toEqual('import Comp1 from \'1.js\';\nexport default {\n    Comp1,\n};');
        });
        streamFiles(['1.js']);
        return promise;
    });
    it('should create simple config for multiple components', () => {
        expect.assertions(2);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual("export default {\nComp1: `@example <Content/>\n@param {string} someProp1\n@name Comp1\n@param {node} [children] `,\nComp2Name: `@name Comp2Name\n@module Comp2Module\n@example <Comp2 />\n@example <Comp2 someProp1=\"val1\" someProp2=\"val2\">child</Comp2>\n@param {string} someProp1\n@param {\"val2\"|\"val3\"} [someProp2]`,\n}");
            expect(getCompsFile()).toEqual("import Comp1 from \'1.js\';\nimport Comp2Name from \'2.js\';\nexport default {\n    Comp1,\n    Comp2Name,\n};");
        });
        streamFiles(['1.js', '2.js']);
        return promise;
    });
    it('should create documentation for only prop-types', () => {
        expect.assertions(1);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual("export default {\nComp3: `\n@name Comp3\n@param {node} children=\'yo\' \n@param {'option1'|'option2'} [someProp1] \n@param {object} [someProp2] \n@param {func} [someFn] \n@param {object} someObject `,\n}");
        });
        streamFiles(['3.js']);
        return promise;
    });
});