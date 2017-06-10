import {Component} from 'react';
import TextField from '../MaterialSlim/TextField';
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
            currentComponentName,
            goToUrl
        } = this.props;

        let componentsLinks = components
            .filter(component => component.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1)
            .map(component => (
                <div
                    className={`component-link${currentComponentName === component.name ? ' selected' : ''}`}
                    key={`link-for-${component.name}`}>
                    <button onClick={() => goToUrl(component.name)} tabIndex="1">
                        {component.name}
                    </button>
                </div>
            ));
        if (!componentsLinks.length) {
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