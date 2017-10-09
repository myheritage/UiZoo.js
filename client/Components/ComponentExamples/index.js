import React from 'react';
import _ from 'underscore';
import ComponentExample from './ComponentExample';
import './index.scss';

/**
 * @description
 * show list of examples for this component
 * 
 * @param {string[]} examples
 * @param {function} onChange will be called when one of the examples is being chosen
 */
export default class ComponentExamples extends React.Component {
    constructor(props) {
        super(props);
        this.onExampleChange = this.onExampleChange.bind(this);
    }

    /**
     * Report the parent that an example was chosen
     * @param {string} example 
     */
    onExampleChange(example, exampleIndex) {
        const {onChange = _.noop, changeExampleIndexInUrl = _.noop} = this.props;
        const exampleIndexParam = exampleIndex > 0 ? `/${exampleIndex}` : '';
        changeExampleIndexInUrl(exampleIndexParam);
        onChange(example);
    }

    /**
     * Render the list of examples
     */
    render () {
        const examples = (this.props.examples || [])
            .map((example, i) => (
                <ComponentExample
                    key={`component-example-${i}`}
                    example={example}
                    exampleIndex={i}
                    onChange={this.onExampleChange}/>
            ));
        
        return (
            <div className="library-_-component-examples">
                {examples}
            </div>
        );
    }
}