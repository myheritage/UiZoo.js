import React from 'react';
import _ from 'underscore';
import RaisedButton from '../../UI/RaisedButton';
import CodeCard from '../../UI/CodeCard';
import './index.scss';

/**
 * @description
 * Show a single example for the component
 * 
 * @param {string} example optionally including a title before the code
 */
export default function ComponentExample ({example, exampleIndex, onChange = _.noop}) {
    return (
        <div className="library-_-component-example">
            <div className="library-_-code-card-frame">
                <a className="library-_-try-it-button">
                    <RaisedButton onClick={e => onChange(example.description, exampleIndex)}>
                        Try it!
                    </RaisedButton>
                </a>
                <CodeCard>
                    {example.description}
                </CodeCard>
            </div>
        </div>
    );
}