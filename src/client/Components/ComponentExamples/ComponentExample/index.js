import React from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from 'material-ui';
import CodeCard from '../../CodeCard';
import extractExample from './extractExample';
import './index.scss';

const style = {
    minWidth: 0,
};

const buttonStyle = {
    height: "24px",
    lineHeight: "24px",
}

const labelStyle = {
    fontSize: "13px",
    paddingLeft: "12px",
    paddingRight: "12px",
    textTransform: "none",
};

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
                    <a className="try-it-button"
                        onTouchTap={e => this.loadExample(code)}>
                        <RaisedButton
                            label="Try it!"
                            primary
                            style={style}
                            buttonStyle={buttonStyle}
                            labelStyle={labelStyle}/>
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