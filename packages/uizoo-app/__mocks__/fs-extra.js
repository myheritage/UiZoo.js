let fs = jest.genMockFromModule('fs-extra');

let mockFiles = {};
function __setMockFiles(newMockFiles) {
    mockFiles = newMockFiles;
}

function __getMockFiles() {
    return mockFiles;
}

function readFile(directoryPath) {
  return Promise.resolve(mockFiles[directoryPath] || []);
}

function writeFile(filePath, fileContent) {
    __setMockFiles(Object.assign({}, mockFiles, {[filePath]: fileContent}));
    return Promise.resolve();
}

fs.__setMockFiles = __setMockFiles;
fs.__getMockFiles = __getMockFiles;
fs.readFile = readFile;
fs.writeFile = writeFile;

module.exports = fs;