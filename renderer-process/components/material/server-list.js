import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import React, {PropTypes} from "react";
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {statusText, statusColor} from "./../helpers.js"

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/styles/colors'
import LastUpdated from "./../../components/last-updated.js"

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = ({deleteFunc, fetchBundlesFunc}) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Info</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem onTouchTap={deleteFunc}>Delete</MenuItem>
        <MenuItem onTouchTap={fetchBundlesFunc}>Bundles</MenuItem>
    </IconMenu>
);

class ServerList extends React.Component{

    constructor(props){
        super(props);
        let onRemoveClick = id => () => props.removeServer(id);
        let fetchBundlesClick = () => () => {};//TODO: id => () => props.fetchBundles(id);

        this.renderItem = item => {
            let color = item.lastStatus ? statusColor(item.lastStatus.status) : undefined;
            let text = item.lastStatus ? statusText(item.lastStatus.status) : undefined;
            let time = item.lastStatus ? item.lastStatus.time : undefined;

            let secondaryText = color && text ? (<p><span style={{color}}>{text}</span> <LastUpdated time={time}/> <br /></p>) : undefined;

            return (<ListItem
                  rightIconButton={rightIconMenu({fetchBundlesFunc: fetchBundlesClick(item.id), deleteFunc: onRemoveClick(item.id)})}
                  primaryText={item.name}
                  key={"" + item.id + "-" + (item.lastStatus ? item.lastStatus.time : "")}
                  secondaryText={secondaryText}
                  secondaryTextLines={1}
                />);
        }
    }

    render(){
        return  (
            <div>
                <List>
                    {this.props.items.map(this.renderItem)}
                </List>
                <FloatingActionButton onClick={this.props.onAddClick} mini={true} secondary={true} style={{marginLeft: 20}}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default ServerList;