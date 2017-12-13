import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import ModulePreview from '../ModulePreview';
import _ from "underscore";
import './index.scss';

const SHOW_SIDE_BAR_KEY = 'showSideBar';
const DEFAULT_SHOW_SIDE_BAR = true;

/**
 * @class App
 * Main component
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.goToUrl = this.goToUrl.bind(this);
        this.setShowSideBar = this.setShowSideBar.bind(this);
        this.getShowSideBar = this.getShowSideBar.bind(this);
        this.setInitialShowSideBar = this.setInitialShowSideBar.bind(this);
    }

    /**
     * Setting showSideBar in both localStorage and state
     * @param {boolean} value 
     */
    setShowSideBar(value) {
        try {
            window.localStorage.setItem(SHOW_SIDE_BAR_KEY, JSON.stringify(value));
        } catch (e) { }
        this.setState({ showSideBar: value });
    }

    /**
     * Returns showSideBar from localStorage
     * @returns {boolean} 
     */
    getShowSideBar() {
        try {
            return JSON.parse(window.localStorage.getItem(SHOW_SIDE_BAR_KEY));
        } catch (e) {
            return undefined;
        }
    }

    /**
     * Setting initial showSideBar
     */
    setInitialShowSideBar() {
        const localStorageValue = this.getShowSideBar();
        const initialValue = localStorageValue !== undefined ? localStorageValue : DEFAULT_SHOW_SIDE_BAR;
        this.setShowSideBar(initialValue);
    }

    componentWillMount() {
        this.setInitialShowSideBar();        
    }

    /**
     * Render component review for a specific component
     * @param {String} componentName 
     */
    renderComponentReview(componentName) {
        const { documentations, components, componentsByModule, match, compiler, baseRoute } = this.props;

        return (
            <div className="library-_-view-section library-_-review">
                <ComponentReview
                    components={components}
                    documentations={documentations}
                    componentName={componentName}
                    compiler={compiler}
                    exampleIndex={match.params.exampleIndex}
                    changeExampleIndexInUrl={exampleIndexParam => this.props.history.push(`${baseRoute}${componentName}${exampleIndexParam}`)}
                    goToUrl={this.goToUrl} />
            </div>
        );
    }

    /**
     * Render module preview showing all module's components, 
     * or all library modules with their components
     * @param {String} moduleName 
     * @param {Boolean} doesDataExist 
     */
    renderModulePreview(moduleName, doesDataExist) {
        const { componentsByModule, components, documentations, compiler } = this.props;

        return (
            <div className="library-_-view-section library-_-module-preview">
                <ModulePreview
                    moduleName={doesDataExist ? moduleName : 'All'}
                    componentsByModule={componentsByModule}
                    components={components}
                    documentations={documentations}
                    compiler={compiler}
                    isMainModule={!doesDataExist}
                    goToUrl={this.goToUrl} />
            </div>
        );
    }

    goToUrl(url) {
        const { baseRoute } = this.props;
        this.props.history.push(`${baseRoute}${url}`);
    }

    render() {
        const { documentations, components, componentsByModule, match, compiler, baseRoute } = this.props;
        const componentName = match.params.componentName;
        const showSideBar = this.state.showSideBar;
        const showSideBarClassName = showSideBar ? ' show-side-bar' : '';

        const isModule = _.includes(_.keys(componentsByModule), componentName);
        const isComponent = components[componentName] && !isModule;
        const doesDataExist = components[componentName] || isModule;

        return (
            <div className={`library-_-app${showSideBarClassName}`}>
                <button
                    className="library-_-toggle-side-bar"
                    onClick={() => this.setShowSideBar(!showSideBar)} />
                <div className="library-_-side-bar">
                    <ComponentsSideBar
                        components={components}
                        componentsByModule={componentsByModule}
                        selectedComponentName={componentName}
                        goToUrl={this.goToUrl} />
                </div>
                {isComponent ?
                    this.renderComponentReview(componentName) :
                    this.renderModulePreview(componentName, doesDataExist)}
            </div>
        );
    }
}