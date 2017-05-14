import bundleUserAssets from "../services/userAssetBundlerService";
import createComponentContainer from "../services/componentContainerCreator";
import extractDocumentation from "../services/documentExtractor";
import libraryConfig from '../config/user.config';
import libraryConfigExecuter from '../services/libraryConfigExecuter';

export default function initData(callback) {
    let configData = libraryConfigExecuter(libraryConfig);
    createComponentContainer(configData.components);
    bundleUserAssets(libraryConfig);

    configData.documentation = configData.components.reduce((docMap, currComp) => {
        let currDoc = extractDocumentation(currComp.path) || { };

        let sectionParts = currComp.name.split("/");

        currDoc.name = sectionParts.splice(-1);
        currDoc.section = sectionParts.join("/");

        docMap[currComp.name] = currDoc;
        return docMap;
    }, {});

    return configData;
}