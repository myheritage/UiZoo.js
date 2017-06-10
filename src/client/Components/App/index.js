import React from 'react';
import ComponentsSideBar from '../ComponentsSideBar';
import ComponentReview from '../ComponentReview';
import './index.scss';

export default class App extends React.Component {
    render() {
        const {documentations, components, match, compiler} = this.props;
        const componentName = match.params.componentName;

        return (
            <div className="bibliotheca-app">
                <div className="bibliotheca-side-bar">
                    <ComponentsSideBar
                        components={components}
                        componentName={componentName}
                        goToUrl={this.props.history.push}/>
                </div>
                <div className="bibliotheca-review">
                    <ComponentReview 
                        components={components}
                        documentations={documentations}
                        componentName={componentName}
                        compiler={compiler}/>
                </div>
            </div>
        )
    }
}