import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import MusicListItem from './MusicListItem';

//Wrapper class for SelectableList
let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);


class MusicList extends Component {

  state = {
    data: this.props.musicItems
  }

  handleChangeSong(item) {
    this.props.onChangeSong(item);
  }
  
  render() {
    // console.log(this.props.musicItems);

    let listItems = [];

    this.props.musicItems.forEach((item, i) => {
        if (item.artistName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
            return;
        }
        listItems.push(<MusicListItem key={i} value={i} songData={item} currentAudio={this.props.currentAudio} onChangeSong={this.handleChangeSong.bind(this)}/>);
    })

    return (
      <SelectableList defaultValue={0} >
        { listItems }
      </SelectableList>
     
    );
  }
  
}

export default MusicList;