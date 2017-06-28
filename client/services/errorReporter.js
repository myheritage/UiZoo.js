let instance = null;

/**
 * Error reporter for bibliotecha
 */
export default class ErrorReporter {
    constructor() {
        this.errorList = [];
    }

   static getInstance() {
        if (!instance) {
            instance = new ErrorReporter();
        }

        return instance;
    }

    /**
     * Report error
     * @param {string} message 
     */
    reportError(message, args) {
        console.error(message, args);
        this.errorList.push(`${message} ${args}`);
    }

    /**
     * Get bibliotheca errors
     * @param {*} errorList 
     */
    getErrors(errorList) {
        return this.errorList;
    }
}


