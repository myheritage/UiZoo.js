import {Component} from 'react';
import TextField from '../BibliothecaUI/TextField';
import './index.scss';

export default class ComponentsSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchValue: ''};
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(e) {
        const newValue = e.target.value;
        this.setState({searchValue: newValue || ''});
    }

    renderComponentsLinks() {
        const {
            components,
            componentName,
            goToUrl
        } = this.props;

        let componentsLinks = [];

        for (let name in components) {
            let component = components[name];
            if (name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1) {
                componentsLinks.push(
                    <div
                        className={`component-link${componentName === name ? ' selected' : ''}`}
                        key={`link-for-${name}`}>
                        <button onClick={() => goToUrl(name)} tabIndex="1">
                            {name}
                        </button>
                    </div>
                );
            }
        }
        
        if (componentsLinks.length === 0) {
            componentsLinks.push(
                <div className="component-no-links">
                    No matches for "{this.state.searchValue}"
                </div>
            )
        }
        return componentsLinks;
    }

    render() {
        return (
            <div className="bibliotheca-components-side-bar">
                <h1 className="bibliotheca-title" onClick={() => this.props.goToUrl('/')}>
                    Bibliotheca
                </h1>
                <div className="bibliotheca-icon"/>
                <div className="components-search-bar">
                    <TextField 
                        value={this.state.searchValue}
                        onChange={this.onSearchChange}
                        placeholder="> Search"
                    />
                </div>
                <div className="components-links">
                    {this.renderComponentsLinks()}
                </div>
            </div>
        )
    }
}