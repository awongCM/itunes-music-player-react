import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import './MusicListItem.css';

class MusicListItem extends Component {
	handleChangeSong(){
		this.props.onChangeSong(this.props.songData);
	}

	render() {
		const item = this.props.songData;
		const isActive = this.props.currentAudio &&
			this.props.currentAudio.previewUrl === item.previewUrl;
		const showNowPlaying = isActive && this.props.isCurrentlyPlaying;

		return (
			<ListItem
				className={'MusicListItem' + (isActive ? ' MusicListItem--active' : '')}
				value={this.props.value}
				innerDivStyle={{ position: 'relative' }}
				primaryText={<span className="MusicListItem__trackName">{item.trackName}</span>}
				leftAvatar={<Avatar src={item.artworkUrl60} size={50} className="AvatarSquare"/>}
				rightIcon={showNowPlaying ? (
					<span className="MusicListItem__nowPlaying" aria-label="Now playing">
						<span className="MusicListItem__nowPlayingDot" aria-hidden="true" />
						Now playing
					</span>
				) : null}
				onTouchTap={this.handleChangeSong.bind(this)}
				secondaryText={
					<p>
						<span className="MusicListItem__artist">{item.artistName}</span><br/>
						<span className="MusicListItem__album">{item.collectionName}</span>
					</p>
				}
				secondaryTextLines={2}
			/>
		);
	}

}

export default MusicListItem;
