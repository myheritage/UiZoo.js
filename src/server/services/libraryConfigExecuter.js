import * as _ from "underscore";

function libraryConfigExecuter(config) {
    return {
        components: config.componentDataListFetcher(),
    }
}

export default _.memoize(libraryConfigExecuter);

