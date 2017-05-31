import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from '../../MaterialSlim/RaisedButton';
import CodeCard from '../../CodeCard';
import extractExample from './extractExample';
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
        const {title, code} = extractExample(this.props.example);

        return (
            <div className="component-example">
                {!!title && <p className="example-title">{title}</p>}
                <div className="code-card-frame">
                    <a className="try-it-button">
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

ComponentExample.PropTypes = {
    example: PropTypes.string
};