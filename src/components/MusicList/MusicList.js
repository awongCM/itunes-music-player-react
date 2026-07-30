import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, makeSelectable} from 'material-ui/List';
import MusicListItem from './MusicListItem';
import './MusicList.css';

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
    let listIndex = 0;

    this.props.musicItems.forEach((item, i) => {
        if (item.artistName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
            return;
        }
        listItems.push(
          <MusicListItem
            key={item.previewUrl || i}
            value={listIndex}
            songData={item}
            currentAudio={this.props.currentAudio}
            isCurrentlyPlaying={this.props.isCurrentlyPlaying}
            onChangeSong={this.handleChangeSong.bind(this)}
          />
        );
        listIndex += 1;
    })

    return (
      <div className="MusicList">
        <SelectableList defaultValue={0} >
          { listItems }
        </SelectableList>
      </div>
    );
  }
  
}

export default MusicList;