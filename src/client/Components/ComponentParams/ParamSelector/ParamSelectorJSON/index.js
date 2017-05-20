import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from 'material-ui';
import tryToParseJson from './tryToParseJson';
import './index.scss';

const textFieldStyle = {height: "42px", width: "130px", fontSize: "15px", marginTop: "-10px"};

export default class ParamSelectorJSON extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.selectedValue || ''
        };
        this.onChange = this.onChange.bind(this);
        this.reportChangeBounced = _.debounce(val => this.reportChange(val), 150);
    }

    componentWillReceiveProps(nextProps) {
        const nextStringifiedValue = JSON.stringify(nextProps.selectedValue);
        if (nextStringifiedValue !== JSON.stringify(this.props.selectedValue)) {
            this.setState({value: nextStringifiedValue || ''});
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    onChange(e) {
        const newValue = e.target.value;
        this.setState({value: newValue});
        this.reportChangeBounced(newValue);
    }

    reportChange(val) {
        val = tryToParseJson(val);
        this.props.onChange && this.props.onChange(null, val);
    }

    render() {
        return (
            <div className="json-selector-wrapper">
                <TextField
                    style={textFieldStyle}
                    multiLine={true}
                    rowsMax={4}
                    id={`json-text-field-for-${this.props.name}`}
                    hintText="string, array, etc"
                    onChange={this.onChange}/>
            </div>
        );
    }
}

ParamSelectorJSON.PropTypes = {
    name: PropTypes.string,
    selectedValue: PropTypes.any,
    onChange: PropTypes.func
};