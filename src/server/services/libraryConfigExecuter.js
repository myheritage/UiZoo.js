export default function libraryConfigExecuter(config) {
    return {
        components: config.componentNameListFetcher().map(curr => ({ name: curr})),
    }
}