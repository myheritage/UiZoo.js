import React from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ComponentReview from '../ComponentReview';

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: true,
        }
    }

    toggleDrawer() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        });
    }

    render() {
        return (
            <div className="master_page_container">
                <div className="master_page_content">
                    <AppBar title="Bibliotecha" onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
                    <Drawer open={this.state.isDrawerOpen}>
                        <AppBar title="Bibliotecha" onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
                        <MenuItem>Demo Component</MenuItem>
                        <MenuItem>Demo Component 2</MenuItem>
                    </Drawer>

                    <ComponentReview />
                </div>
            </div>
        )
    }
}