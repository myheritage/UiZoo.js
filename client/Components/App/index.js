import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import _ from "underscore";
import './index.scss';

/**
 * @class App
 * Main component
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideBar: true
        };
    }
    render() {
        const { documentations, components, componentsByModule, match, compiler, baseRoute } = this.props;
        const componentName = match.params.componentName;
        const showSideBarClassName = this.state.showSideBar ? ' show-side-bar' : '';
        
        return (
            <div className={`library-_-app${showSideBarClassName}`}>
                <button
                    className="library-_-toggle-side-bar"
                    onClick={() => this.setState({showSideBar: !this.state.showSideBar})}/>
                <div className="library-_-side-bar">
                    <ComponentsSideBar
                        components={components}
                        componentsByModule={componentsByModule}
                        selectedComponentName={componentName}
                        goToUrl={url => this.props.history.push(`${baseRoute}${url}`)} />
                </div>
                <div className="library-_-review">
                    <ComponentReview
                        components={components}
                        documentations={documentations}
                        componentName={componentName}
                        compiler={compiler} 
                        exampleIndex={match.params.exampleIndex}
                        changeExampleIndexInUrl={exampleIndexParam => this.props.history.push(`${baseRoute}${componentName}${exampleIndexParam}`)}/>
                </div>
            </div>
        );
    }
}