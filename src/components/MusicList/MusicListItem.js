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
		const isActive = this.props.currentAudio &&
			this.props.currentAudio.previewUrl === item.previewUrl;

		return (
			<ListItem className={'MusicListItem' + (isActive ? ' MusicListItem--active' : '')}
				  value={this.props.index} 
                  primaryText={<span className="MusicListItem__trackName">{item.trackName}</span>}
                  leftAvatar={<Avatar src={item.artworkUrl60} size={50} className="AvatarSquare"/>}
                  onTouchTap={this.handleChangeSong.bind(this)}
                  secondaryText= {
                    <p>
                      <span className="MusicListItem__artist">{item.artistName}</span><br/>
                      <span className="MusicListItem__album">{item.collectionName}</span>
                      {isActive && this.props.isCurrentlyPlaying && (
                        <span className="MusicListItem__nowPlaying">
                          <span className="MusicListItem__nowPlayingDot" />
                          Now playing
                        </span>
                      )}
                    </p>
                  }
                  secondaryTextLines={isActive && this.props.isCurrentlyPlaying ? 3 : 2}
                />
		);
	}

}

export default MusicListItem;