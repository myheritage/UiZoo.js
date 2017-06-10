import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import './index.scss';

export default class App extends React.Component {
    render() {
        const {documentation, components, match} = this.props;
        const currentComponentName = match.params.componentName;
        const currentDocumentation = documentation[currentComponentName];

        return (
            <div className="bibliotheca-app">
                <div className="bibliotheca-side-bar">
                    <ComponentsSideBar
                        components={components}
                        currentComponentName={currentComponentName}
                        goToUrl={this.props.history.push}/>
                </div>
                <div className="bibliotheca-review">
                    <ComponentReview documentation={currentDocumentation}/>
                </div>
            </div>
        )
    }
}