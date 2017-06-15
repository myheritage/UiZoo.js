import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import _ from "underscore";
import './index.scss';

/**
 * @class App
 * Main component of the Bibliotheca
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: true
        };
    }
    render() {
        const { documentations, components, componentsByModule, match, compiler } = this.props;
        const componentName = match.params.componentName;
        const showSideBarClassName = this.state.showSideBar ? ' show-side-bar' : '';
        
        return (
            <div className={`bibliotheca-app${showSideBarClassName}`}>
                <button
                    className="bibliotheca-toggle-side-bar"
                    onClick={() => this.setState({showSideBar: !this.state.showSideBar})}/>
                <div className="bibliotheca-side-bar">
                    <ComponentsSideBar
                        components={components}
                        componentsByModule={componentsByModule}
                        selectedComponentName={componentName}
                        goToUrl={this.props.history.push} />
                </div>
                <div className="bibliotheca-review">
                    <ComponentReview
                        components={components}
                        documentations={documentations}
                        componentName={componentName}
                        compiler={compiler} />
                </div>
            </div>
        );
    }
}