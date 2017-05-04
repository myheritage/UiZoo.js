import React from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { Link } from "react-router-dom";

import "./index.scss";

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: true,
            components: window.libraryConfiguration.components,
        }
    }

    toggleDrawer() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        });
    }

    renderComponentMenuItem(componentName) {
        return (
            <Link key={componentName} to={`/${componentName}`}>
                <MenuItem primaryText={componentName}/>
            </Link>
        );
    }

    render() {
        const drawerMenuItems = this.state.components.map(component => this.renderComponentMenuItem(component.name));

        return (
            <div className="master_page_container">
                <Drawer className="component_menu" open={this.state.isDrawerOpen} width="30%">
                    <AppBar showMenuIconButton={false} />
                    {drawerMenuItems}
                </Drawer>
                <div className={`"master_page_content${this.state.isDrawerOpen ? ' component_drawer_open' : ''}`}>
                    <AppBar title="Bibliotecha" onLeftIconButtonTouchTap={() => this.toggleDrawer()} />
                    <div className="master_page_component_view">
                        <h1>{this.props.match.params.componentName}</h1>
                    </div>
                </div>
            </div>
        )
    }
}