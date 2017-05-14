import React from 'react';

import Popover from 'material-ui/Popover/Popover';
import ParamSelector from './ParamSelector';

import './index.scss';

export default class ComponentParams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {popoverOpen: false};
    }
    
    openParamDescription(popoverAnchorEl, popoverContent) {
        if (popoverContent) {
            this.setState({
                popoverOpen: true,
                popoverAnchorEl,
                popoverContent,
            });
        }
    }

    closeParamDescription () {
        this.setState({popoverOpen: false});
    };

    renderSelector(paramObj) {
        return (
            <div className="component-params-selector" key={`param-name-${paramObj.name}`}>
                <p  className="param-name"
                    onTouchTap={e => this.openParamDescription(e.currentTarget, paramObj.description)}
                >
                    {paramObj.name}
                    {!!paramObj.isOptional && <span>*</span>}
                </p>
                <ParamSelector 
                    type={paramObj.type}
                    values={paramObj.values}
                    selectedValue={undefined}
                    onChange={(e) => console.log(e)} />
                
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
                    anchorOrigin={{horizontal: 'left',vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    onRequestClose={() => this.closeParamDescription()}
                >
                    <div className="component-params-popover-content">
                        <p>{this.state.popoverContent}</p>
                    </div>
                </Popover>
            </div>
        );
    }
}