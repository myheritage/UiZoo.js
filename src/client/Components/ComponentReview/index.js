import React from "react";

export default class ComponentReview extends React.Component {
    render () {
        const Component = window.libraryData ? window.libraryData[this.props.match.params.componentName] : "div";
        
        return (
            <div className="component-review">
                <h1>{this.props.match.params.componentName}</h1>
                <Component/>
            </div>
        );
    }
}