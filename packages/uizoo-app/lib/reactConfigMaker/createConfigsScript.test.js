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
    '4.js': getTestFile(4),
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
            expect(getDocsFile()).toEqual(
`export default {
Comp1: \`@example <Comp1/>
@param {string} someProp1
@name Comp1
@param {node} [children] \`,
}`
            );
            expect(getCompsFile()).toEqual(
`import Comp1 from '1.js';
export default {
    Comp1,
};`
            );
        });
        streamFiles(['1.js']);
        return promise;
    });
    it('should create simple config for multiple components', () => {
        expect.assertions(2);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual(
`export default {
Comp1: \`@example <Comp1/>
@param {string} someProp1
@name Comp1
@param {node} [children] \`,
Comp2Name: \`@name Comp2Name
@module Comp2Module
@example <Comp2 />
@example <Comp2 someProp1="val1" someProp2="val2">child</Comp2>
@param {string} someProp1
@param {"val2"|"val3"} [someProp2]\`,
}`
            );
            expect(getCompsFile()).toEqual(
`import Comp1 from '1.js';
import Comp2Name from '2.js';
export default {
    Comp1,
    Comp2Name,
};`
            );
        });
        streamFiles(['1.js', '2.js']);
        return promise;
    });
    it('should create documentation for only prop-types', () => {
        expect.assertions(1);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual(
`export default {
Comp3: \`
@name Comp3
@param {node} children 
@param {'option1'|'option2'} [someProp1] 
@param {object} [someProp2] 
@param {func} [someFn] 
@param {object} someObject \`,
}`
            );
        });
        streamFiles(['3.js']);
        return promise;
    });

    it('should create documentation even if react-docgen miss the comment', () => {
        expect.assertions(1);
        const promise = createConfigsScript(...configArgs).then(() => {
            expect(getDocsFile()).toEqual(
`export default {
Comp4: \`@name Comp4
@example <Comp4 />
@param {string} someProp1\`,
}`
            );
        });
        streamFiles(['4.js']);
        return promise;
    });
});