import { Component } from 'react';
import TextField from '../BibliothecaUI/TextField';
import Collapsible from "../BibliothecaUI/Collapsible";
import _ from "underscore";
import { NON_MODULE_NAME } from "../../constants/modules";

import './index.scss';

export default class ComponentsSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchValue: '' };
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {
        const newValue = e.target.value;
        this.setState({ searchValue: newValue || '' });
    }

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

        // Add module componenets
        _.keys(componentsByModule).filter(curr => curr !== NON_MODULE_NAME).forEach(moduleName => {
            let moduleLinks = this.renderModuleLinks(componentsByModule[moduleName]);

            if (moduleLinks.length > 0) {
                let moduleCollapsible = (
                    <Collapsible title={moduleName} isOpen={true}>
                        {moduleLinks}
                    </Collapsible>
                );

                componentsLinks.push(moduleCollapsible)
            }
        });

        if (componentsLinks.length === 0) {
            componentsLinks.push(
                <div className="bibliotheca-component-no-links">
                    No matches for "{this.state.searchValue}"
                </div>
            )
        }
        return componentsLinks;
    }

    renderModuleLinks(moduleComponents) {
        return moduleComponents &&
        moduleComponents
            .filter(curr => curr && curr.name) // TODO:  find why we need this 
            .filter(currModuleComponent => currModuleComponent.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1)
            .map(currComponent => this.renderComponentLink(currComponent.name));
    }

    renderComponentLink(componentName) {
        let {
            selectedComponentName,
            goToUrl,
        } = this.props;

        return (
            <div
                className={`bibliotheca-component-link${componentName === selectedComponentName ? ' selected' : ''}`}
                key={`link-for-${componentName}`}>
                <button onClick={() => goToUrl(componentName)} tabIndex="1">
                    {componentName}
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="bibliotheca-components-side-bar">
                <h1 className="bibliotheca-title" onClick={() => this.props.goToUrl('/')}>
                    Bibliotheca
                </h1>
                <div className="bibliotheca-icon" />
                <div className="bibliotheca-components-search-bar">
                    <TextField
                        value={this.state.searchValue}
                        onChange={this.onSearchChange}
                        placeholder="> Search"
                    />
                </div>
                <div className="bibliotheca-components-links">
                    {this.renderComponentsLinks()}
                </div>
            </div>
        )
    }
}