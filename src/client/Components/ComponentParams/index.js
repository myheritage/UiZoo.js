import React from 'react';
import PropTypes from 'prop-types';

import Popover from 'material-ui/Popover/Popover';
import ParamSelector from './ParamSelector';

import './index.scss';

const anchorOrigin = {
    horizontal: 'left',
    vertical: 'top'
};
const targetOrigin = {
    horizontal: 'left',
    vertical: 'bottom'
};

export default class ComponentParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
    }

    openParamDescription(popoverAnchorEl, popoverContent) {
        if (popoverContent) {
            this.setState({popoverOpen: true, popoverAnchorEl, popoverContent});
        }
    }

    closeParamDescription() {
        this.setState({popoverOpen: false});
    }

    onChange(e, paramName, newValue) {
        this.props.onChange && this.props.onChange(e, paramName, newValue);
    }

    renderSelector(paramObj) {
        return (
            <div className="component-params-selector" key={`param-name-${paramObj.name}`}>
                <p
                    className="param-name"
                    onTouchTap={e => this.openParamDescription(e.currentTarget, paramObj.description)}>
                    {paramObj.name}
                    {!!paramObj.isOptional && <span>*</span>}
                </p>
                <ParamSelector
                    type={paramObj.type}
                    values={paramObj.values}
                    selectedValue={undefined}
                    onChange={(e, newValue) => this.onChange(e, paramObj.name, newValue)}/>
            </div>
        );
    }

    render() {
        const selectors = (this.props.params || []).map(paramObj => this.renderSelector(paramObj));
        return (
            <div className="component-params">
                {selectors}
                {selectors.length === 0 && 'None'}
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.popoverAnchorEl}
                    anchorOrigin={anchorOrigin}
                    targetOrigin={targetOrigin}
                    onRequestClose={() => this.closeParamDescription()}>
                    <div className="component-params-popover-content">
                        <p>{this.state.popoverContent}</p>
                    </div>
                </Popover>
            </div>
        );
    }
}

ComponentParams.propTypes = {
    params: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, description: PropTypes.string, isOptional: PropTypes.bool, values: PropTypes.array}))
};