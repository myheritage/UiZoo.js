export default function libraryConfigExecuter(config) {
    return {
        components: config.componentDataListFetcher(),
    }
}