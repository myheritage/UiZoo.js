import React from 'react';
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
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Report the parent that an example was chosen
     * @param {string} example 
     */
    onChange(example) {
        this.props.onChange && this.props.onChange(example);
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
                    onChange={this.onChange}/>
            ));
        
        return (
            <div className="component-examples">
                {examples}
            </div>
        );
    }
}