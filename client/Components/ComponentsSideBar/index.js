import { Component } from 'react';
import TextField from '../UI/TextField';
import Collapsible from "../UI/Collapsible";
import _ from "underscore";
import { NON_MODULE_NAME } from "../../constants/modules";

import './index.scss';

/**
 * @name
 * ComponentsSideBar
 * 
 * @description
 * Side bar for showing all the components
 * 
 * @param {object} components
 * @param {object} componentsByModule
 * @param {string} selectedComponentName
 * @param {function} goToUrl
 */
export default class ComponentsSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchValue: '' };
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    /**
     * Search value was changed, update state
     * @param {event} e 
     */
    onSearchChange(e) {
        const newValue = e.target.value;
        this.setState({ searchValue: newValue || '' });
    }

    /**
     * get jsx of the links in their module
     */
    renderComponentsLinks() {
        const {
            components,
            componentsByModule,
            selectedComponentName,
            goToUrl,
        } = this.props;

        let componentsLinks = [];

        // Init side bar with non module components
        componentsLinks = componentsLinks.concat(this.renderModuleLinks(componentsByModule[NON_MODULE_NAME]));

        // Add module components
        _.keys(componentsByModule).filter(curr => curr !== NON_MODULE_NAME).forEach(moduleName => {
            let moduleLinks = this.renderModuleLinks(componentsByModule[moduleName]);

            if (moduleLinks.length > 0) {
                let moduleCollapsible = (
                    <Collapsible title={moduleName} isOpen={true} key={`collapsible-for-module-${moduleName}`}>
                        {moduleLinks}
                    </Collapsible>
                );

                componentsLinks.push(moduleCollapsible)
            }
        });

        if (componentsLinks.length === 0) {
            componentsLinks.push(
                <div className="library-_-component-no-links" key="no-links-found">
                    No matches for "{this.state.searchValue}"
                </div>
            )
        }
        return componentsLinks;
    }

    /**
     * Get the component name, compatible with ie11 that doesn't support Function.prototype.name ...
     * @param {function} comp 
     * @return {string}
     */
    getComponentName(comp) {
        let componentName = '';
        if (comp) {
            if (comp.name) {
                componentName = comp.name
            } else if (typeof comp === 'function') { // ie11 stuff make sure it's function
                componentName = comp.toString().match(/^function\s*([^\s(]+)/)[1];
            }
        }
        return componentName;
    }

    /**
     * @param {Array} moduleComponents 
     */
    renderModuleLinks(moduleComponents) {
        return moduleComponents &&
        moduleComponents
            .filter(currModuleComponent => this.getComponentName(currModuleComponent).toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1)
            .map(currComponent => this.renderComponentLink(this.getComponentName(currComponent)));
    }

    /**
     * @param {string} componentName 
     */
    renderComponentLink(componentName) {
        let {
            selectedComponentName,
            goToUrl,
        } = this.props;

        return (
            <div
                className={`library-_-component-link${componentName === selectedComponentName ? ' selected' : ''}`}
                key={`link-for-${componentName}`}>
                <button onClick={() => goToUrl(componentName)} tabIndex="1">
                    {componentName}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="library-_-components-side-bar">
                <h1 className="library-_-title" onClick={() => this.props.goToUrl('')}>
                    UiZoo.js
                </h1>
                <div className="library-_-icon" />
                <div className="library-_-components-search-bar">
                    <TextField
                        value={this.state.searchValue}
                        onChange={this.onSearchChange}
                        placeholder="> Search"
                    />
                </div>
                <div className="library-_-components-links">
                    {this.renderComponentsLinks()}
                </div>
            </div>
        );
    }
}