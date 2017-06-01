import React from 'react';
import './index.scss';

export default class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {className: ''};
    }
    render() {
        return (
            <div className={`text-field${this.state.className}`}>
                <textarea
                    onFocus={() => this.setState({className:' is-focused'})}
                    onBlur={() => this.setState({className:''})}
                    tabIndex="1"
                    rows="1"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={e => this.props.onChange(e)}/>
            </div>
        );
    }

}