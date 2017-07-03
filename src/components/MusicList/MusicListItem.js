import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import './MusicListItem.css';

class MusicListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.songData,
			isSelected: false
		}
	}

	handleChangeSong(){
		this.props.onChangeSong(this.state.item);	
		
	}

	render() {
		const item = this.state.item;

		return (
			<ListItem className='MusicListItem'
				  value={this.props.index} 
                  primaryText={item.trackName}
                  leftAvatar={<Avatar src={item.artworkUrl60} size={50} className="AvatarSquare"/>}
                  onTouchTap={this.handleChangeSong.bind(this)}
                  secondaryText= {
                    <p>
                      <span>{item.artistName}</span><br/>
                      <span>{item.collectionName}</span>
                    </p>
                  }
                  secondaryTextLines={2}
                />
		);
	}

}

export default MusicListItem;