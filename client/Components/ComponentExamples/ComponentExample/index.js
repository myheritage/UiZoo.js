import React from 'react';
import RaisedButton from '../../BibliothecaUI/RaisedButton';
import CodeCard from '../../BibliothecaUI/CodeCard';
import './index.scss';

/**
 * @description
 * Show a single example for the component
 * 
 * @param {string} example optionally including a title before the code
 */
export default class ComponentExample extends React.Component {
    /**
     * Report parent that example should be loaded
     * @param {string} example the code example without title
     */
    loadExample(example) {
        this.props.onChange && this.props.onChange(example);
    }

    /**
     * Render the example
     */
    render () {
        const code = this.props.example.description;
        
        return (
            <div className="bibliotheca-component-example">
                <div className="bibliotheca-code-card-frame">
                    <a className="bibliotheca-try-it-button">
                        <RaisedButton onClick={e => this.loadExample(code)}>
                            Try it!
                        </RaisedButton>
                    </a>
                    <CodeCard>
                        {code}
                    </CodeCard>
                </div>
            </div>
        );
    }
}