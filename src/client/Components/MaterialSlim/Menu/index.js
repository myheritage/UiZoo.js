import React from 'react';
import './index.scss';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedValue: props.value};
    }

    componentWillReceiveProps(nextProps) {
        const {value} = nextProps;
        if (value !== this.props.value && value !== this.state.selectedValue) {
            this.setState({selectedValue: value});
        }
    }
    
    onChange(e, val) {
        if (val !== this.state.selectedValue) {
            this.props.onChange && this.props.onChange(e, val);
        }
    }

    getItemClassName(val) {
        return `menu-item-wrapped${val === this.state.selectedValue ? ' selected' : ''}`;
    }

    render () {
        const items = React.Children.map(this.props.children, child => (
            <div
                tabIndex="1"
                onClick={e => this.onChange(e, child.props.value)}
                className={this.getItemClassName(child.props.value)}>
                {child}
            </div>
        ));

        return (
            <div className="menu-wrapper">
                {items}
            </div>
        );
    }
}