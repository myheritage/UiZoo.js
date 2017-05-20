import React from 'react';

export default class ComponentPreview extends React.Component {
    render() {
        // TODO: window namespace should be declared in server
        const ComponentNode = this.props.componentName ? window.libraryData[this.props.componentName] : null;

        return (
            <ComponentNode {...this.props.params}/>
        )
    }
}